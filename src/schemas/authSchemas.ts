import { z } from "zod";

export const signupEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[!@#$%^&*]/, "Must contain at least one special character"),
});

export const signinEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().trim().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[!@#$%^&*]/, "Must contain at least one special character"),
    confirmPassword: z.string().trim().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must only contain numbers"),
});

export const createPinSchema = z
  .object({
    pin: z
      .string()
      .length(4, "PIN must be exactly 4 digits")
      .regex(/^\d+$/, "PIN must only contain numbers"),
    confirmPin: z.string().length(4, "PIN must be exactly 4 digits"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });
