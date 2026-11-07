import { Router } from "express";
import {
  loginSchema,
  requestOtpSchema,
  resetPasswordSchema,
  signupSchema,
  verifyOtpSchema,
} from "../../schemas/authSchema.js";
import { pool } from "../config/db.js";
import { compareValues, hashString, hashValue } from "../utils/hash.js";
import { createOtp, verifyOtp } from "../services/otp.js";
import { sendOTPEmail } from "../services/email.js";
import { generateUserSession } from "../services/auth.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { toPublicUser } from "../utils/user.js";

const authRoutes = Router();

// request OTP route
authRoutes.post("/request-otp", async (req, res) => {
  const result = requestOtpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid input data",
      errors: result.error.issues.map((err) => err.message),
    });
  }

  const { email, action } = result.data;
  try {
    const { rawOTP, id } = await createOtp({ email, action });
    await sendOTPEmail({ to: email, otp: rawOTP, purpose: action });
    return res.status(200).json({
      status: true,
      message: "OTP sent to your email",
      data: { otp_request_uuid: id },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

// verify OTP route
authRoutes.post("/verify-otp", async (req, res) => {
  const result = verifyOtpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid input data",
      errors: result.error.issues.map((err) => err.message),
    });
  }

  const { otp, otp_request_uuid, action } = result.data;

  try {
    const verification = await verifyOtp({ otp, otp_request_uuid, action });

    if (!verification.valid) {
      return res.status(400).json({
        status: false,
        message: verification.reason,
      });
    }

    const rawUUID = crypto.randomUUID();
    const hashedUUID = hashString(rawUUID);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    await pool.query(
      `INSERT INTO verified_emails (id, email, action, expires_at) VALUES ($1, $2, $3, $4)`,
      [hashedUUID, verification.email, action, expiresAt],
    );

    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
      data: { verified_email_uuid: rawUUID },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

// Sign-up route
authRoutes.post("/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid input data",
      errors: result.error.issues.map((err) => err.message),
    });
  }

  const { email, password, pin, verified_email_uuid } = result.data;

  try {
    const hashedUUID = hashString(verified_email_uuid);
    const verification = await pool.query(
      `DELETE FROM verified_emails WHERE id = $1 AND email = $2 AND action = 'signup' AND expires_at > NOW() RETURNING email`,
      [hashedUUID, email],
    );

    const row = verification.rows[0];
    if (!row) {
      return res.status(400).json({
        status: false,
        message: "Invalid or expired verification.",
      });
    }

    const hashedPassword = await hashValue(password);
    const hashedPin = await hashValue(pin);

    const newUser = await pool.query(
      `INSERT INTO users (email, password_hash, pin_hash) VALUES ($1, $2, $3) RETURNING id, email, full_name, phone_number, profile_completed,  bvn_verified`,
      [email, hashedPassword, hashedPin],
    );

    const user = newUser.rows[0];

    const { accessToken, refreshToken } = await generateUserSession(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      status: true,
      message: "Signup successful.",
      data: { user: toPublicUser(user), accessToken },
    });
  } catch (err: any) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        status: false,
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
});

// Login route
authRoutes.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid input data",
      errors: result.error.issues.map((err) => err.message),
    });
  }

  const { email, password } = result.data;

  try {
    const userResult = await pool.query(
      `SELECT id, password_hash, email, full_name, phone_number, profile_completed, bvn_verified FROM users WHERE email = $1`,
      [email],
    );

    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    const isMatch = await compareValues(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await generateUserSession(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: true,
      message: "Login successful.",
      data: { user: toPublicUser(user), accessToken },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

authRoutes.post("/refresh", async (req, res) => {
  const rawToken = req.cookies.refreshToken;
  if (!rawToken) {
    return res.status(401).json({ status: false, message: "No refresh token" });
  }

  try {
    const hashedToken = hashString(rawToken);
    const result = await pool.query(
      `DELETE FROM refresh_tokens WHERE token_hash = $1 AND expires_at > NOW() RETURNING user_id`,
      [hashedToken],
    );

    const row = result.rows[0];

    if (!row) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid or expired refresh token" });
    }

    const { accessToken, refreshToken } = await generateUserSession(
      row.user_id,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: true,
      message: "Token refreshed",
      data: { accessToken },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

// Reset password route
authRoutes.post("/reset-password", async (req, res) => {
  const result = resetPasswordSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid input data",
      errors: result.error.issues.map((err) => err.message),
    });
  }

  const { password, verified_email_uuid } = result.data;
  const hashedPassword = await hashValue(password);
  const hashedUUID = hashString(verified_email_uuid);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const verification = await client.query(
      `DELETE FROM verified_emails WHERE id = $1 AND action = 'password_reset' AND expires_at > NOW() RETURNING email`,
      [hashedUUID],
    );

    const verifiedRow = verification.rows[0];
    if (!verifiedRow) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        status: false,
        message: "Invalid or expired verification.",
      });
    }

    const updated = await client.query(
      `UPDATE users SET password_hash = $1 WHERE email = $2 RETURNING id`,
      [hashedPassword, verifiedRow.email],
    );

    const user = updated.rows[0];
    if (!user) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        status: false,
        message: "Invalid or expired verification.",
      });
    }

    await client.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [
      user.id,
    ]);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    await client.query("COMMIT");
    return res
      .status(200)
      .json({ status: true, message: "Password reset successful." });
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error(err);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  } finally {
    client.release();
  }
});

// Logout route
authRoutes.post("/logout", authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: false, message: "Not authorized" });
  }

  const userId = req.user.id;

  try {
    await pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      status: true,
      message: "Logout successful.",
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
});

export default authRoutes;
