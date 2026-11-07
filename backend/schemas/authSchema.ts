import { z } from "zod";

import { normalizeFullName } from "../src/utils/normalizeFullName.js";
import { normalizePhoneNumber } from "../src/utils/normalizePhone.js";
const passwordComplexityMessage =
  "Password must have: 8+ characters, uppercase letter, number, special character";

// Reusable field schemas
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email address is required")
  .max(255)
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, passwordComplexityMessage)
  .max(72, "Password must be 72 characters or fewer")
  .regex(/[A-Z]/, passwordComplexityMessage)
  .regex(/[0-9]/, passwordComplexityMessage)
  .regex(/[!@#$%^&*]/, passwordComplexityMessage);

export const pinSchema = z
  .string()
  .trim()
  .regex(/^\d{4}$/, "PIN must be exactly 4 digits");

export const otpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Verification code must be exactly 6 digits");

export const fullNameSchema = z
  .string()
  .trim()
  .min(3, "Full name must be at least 3 characters")
  .max(100, "Full name is too long")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "Full name can only contain letters, spaces, hyphens and apostrophes",
  )
  .transform((val) => normalizeFullName(val));

export const phoneNumberSchema = z
  .string()
  .trim()
  .regex(
    /^(0|\+?234)?[789]\d{9}$/,
    "Please enter a valid Nigerian phone number format",
  )
  .transform((val, ctx) => {
    const normalized = normalizePhoneNumber(val);
    if (!normalized) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid Nigerian phone number",
      });
      return z.NEVER;
    }
    return normalized;
  });

// Request OTP
export const requestOtpSchema = z.object({
  email: emailSchema,
  action: z.enum(["signup", "password_reset"]),
});

// Verify OTP
export const verifyOtpSchema = z.object({
  otp_request_uuid: z.string().trim().min(1, "OTP request UUID is required"),
  otp: otpSchema,
  action: z.enum(["signup", "password_reset"]),
});

// Sign up
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  pin: pinSchema,
  verified_email_uuid: z.string().uuid(),
});

// Login
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(72),
});

// Reset password
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verified_email_uuid: z.string().uuid(),
});

// Complete profile
export const completeProfileSchema = z.object({
  fullName: fullNameSchema,
  phoneNumber: phoneNumberSchema,
});
