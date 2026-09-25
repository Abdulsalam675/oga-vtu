import { z } from "zod";

const passwordComplexityMessage =
  "Password must have: 8+ characters, uppercase letter, number, special character";

// Sign-up email and password validation.
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

// Sign-in email and password validation.
export const signinEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Forgot-password email validation.
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Invalid email address"),
});

// New-password and confirmation validation.
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

// Email verification code validation.
export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must only contain numbers"),
});

// Transaction PIN and confirmation validation.
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

// Profile full-name validation.
export const fullNameSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(40, "Full name must be less than 40 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
});

// Nigerian phone-number validation.
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

// BVN verification validation.
export const bvnSchema = z.object({
  bvn: z
    .string()
    .trim()
    .min(1, "BVN is required")
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d+$/, "BVN must contain only numbers"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      return !Number.isNaN(date.getTime()) && date <= today;
    }, "Enter a valid date of birth"),
});

export type SignupEmailSchema = z.infer<typeof signupEmailSchema>;
export type SigninEmailSchema = z.infer<typeof signinEmailSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type CreatePinSchema = z.infer<typeof createPinSchema>;
export type FullNameSchema = z.infer<typeof fullNameSchema>;
export type PhoneNumberSchema = z.infer<typeof phoneNumberSchema>;
export type BvnSchema = z.infer<typeof bvnSchema>;
