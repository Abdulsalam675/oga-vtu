import { pool } from "../config/db.js";
import { compareValues, hashString, hashValue } from "../utils/hash.js";
import { generateOTP } from "../utils/generateOTP.js";

type CreateOtpInput = {
  email: string;
  action: "signup" | "password_reset";
};

// Create a new OTP
export async function createOtp({
  email,
  action,
}: CreateOtpInput): Promise<{ rawOTP: string; id: string }> {
  const rawOTP = generateOTP();
  const hashedOTP = await hashValue(rawOTP);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
  const rawUUID = crypto.randomUUID();
  const hashedUUID = hashString(rawUUID);

  await pool.query(
    `DELETE FROM otp_requests WHERE email = $1 AND action = $2`,
    [email, action],
  );

  await pool.query(
    `INSERT INTO otp_requests (id, email, otp_hash, action, expires_at) VALUES ($1, $2, $3, $4, $5)`,
    [hashedUUID, email, hashedOTP, action, expiresAt],
  );
  return { rawOTP, id: rawUUID };
}

// Verify the OTP
type VerifyOtpInput = {
  otp_request_uuid: string;
  otp: string;
  action: "signup" | "password_reset";
};

type VerifyOtpResult =
  | { valid: true; email: string }
  | { valid: false; reason: string };

export async function verifyOtp({
  otp_request_uuid,
  otp,
  action,
}: VerifyOtpInput): Promise<VerifyOtpResult> {
  const hashedUUID = hashString(otp_request_uuid);

  const result = await pool.query(
    `SELECT email, otp_hash
     FROM otp_requests
     WHERE id = $1 AND action = $2 AND expires_at > NOW()
     LIMIT 1`,
    [hashedUUID, action],
  );

  const row = result.rows[0];

  if (!row) {
    return { valid: false, reason: "Invalid or expired OTP" };
  }

  const match = await compareValues(otp, row.otp_hash);

  if (!match) {
    return { valid: false, reason: "Invalid or expired OTP" };
  }

  await pool.query(`DELETE FROM otp_requests  WHERE id = $1`, [hashedUUID]);

  return { valid: true, email: row.email };
}
