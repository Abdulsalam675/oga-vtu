import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { completeProfileSchema } from "../../schemas/authSchema.js";
import { normalizeFullName } from "../utils/normalizeFullName.js";
import { normalizePhoneNumber } from "../utils/normalizePhone.js";
import { pool } from "../config/db.js";
import { toPublicUser } from "../utils/user.js";

const userRoutes = Router();

userRoutes.post("/complete-profile", authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized access.",
    });
  }

  const result = completeProfileSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: false,
      message: "Invalid input data",
      errors: result.error.issues.map((err) => err.message),
    });
  }

  const { fullName, phoneNumber } = result.data;
  const userId = req.user.id;

  try {
    const updatedResult = await pool.query(
      `UPDATE users 
       SET full_name = $1, 
           phone_number = $2, 
           profile_completed = true 
       WHERE id = $3 AND profile_completed = false 
       RETURNING email, full_name, phone_number, profile_completed, bvn_verified`,
      [fullName, phoneNumber, userId],
    );

    const updatedUser = updatedResult.rows[0];

    if (!updatedUser) {
      return res.status(400).json({
        status: false,
        message: "Profile has already been completed.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Profile completed successfully.",
      data: { user: toPublicUser(updatedUser) },
    });
  } catch (err: any) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        status: false,
        message: "This phone number is already linked to another account.",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
});

export default userRoutes;
