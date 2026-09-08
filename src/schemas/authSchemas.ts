import { z } from "zod";

// Reusable custom messages
const passwordComplexityMessage =
  "Password must have: 8+ characters, uppercase letter, number, special character";

// Sign up validation rules
export const signupEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, passwordComplexityMessage)
    .regex(/[A-Z]/, passwordComplexityMessage)
    .regex(/[0-9]/, passwordComplexityMessage)
    .regex(/[!@#$%^&*]/, passwordComplexityMessage),
});

// Sign in validation rules
export const signinEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Forgot password validation rules
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Invalid email address"),
});

// Reset password validation rules
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, passwordComplexityMessage)
      .regex(/[A-Z]/, passwordComplexityMessage)
      .regex(/[0-9]/, passwordComplexityMessage)
      .regex(/[!@#$%^&*]/, passwordComplexityMessage),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// OTP / Email verification validation rules
export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must only contain numbers"),
});

// Transaction PIN validation rules
export const createPinSchema = z
  .object({
    pin: z
      .string()
      .min(1, "Transaction PIN is required")
      .length(4, "PIN must be exactly 4 digits")
      .regex(/^\d+$/, "PIN must only contain numbers"),
    confirmPin: z.string().min(1, "Please confirm your transaction PIN"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });

export const fullNameSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(40, "Full name must be less than 40 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
});

export const phoneNumberSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(11, "Phone number must be at least 11 digits")
    .max(20, "Phone number is too long")
    .regex(
      /^[0-9+\-\s()]*$/,
      "Phone number must be a valid Nigerian number (e.g., 08012345678)",
    ),
});

// Types inference exports
export type SignupEmailSchema = z.infer<typeof signupEmailSchema>;
export type SigninEmailSchema = z.infer<typeof signinEmailSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type CreatePinSchema = z.infer<typeof createPinSchema>;
export type FullNameSchema = z.infer<typeof fullNameSchema>;
export type PhoneNumberSchema = z.infer<typeof phoneNumberSchema>;
