import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";
import { forgotPasswordSchema } from "../schemas/authSchemas";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setError("");
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const fieldSchema =
      forgotPasswordSchema.shape[
        name as keyof typeof forgotPasswordSchema.shape
      ];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid input");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid email address");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/forgot-password/verify-email");
    }, 2000); // 2 second delay
  }

  return (
    <AuthFormLayout
      title="Forgot Password?"
      subtitle="Enter your email to receive a secure OTP code to reset your password."
      linkLabel="Remember your password?"
      linkTo="/signin"
      linkName="Sign In"
      buttonLabel="Send Reset Code"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {/* Email Input Field */}
      <AuthInput
        label="Email address"
        icon="solar:letter-linear"
        type="email"
        placeholder="Enter your email address"
        value={email}
        name="email"
        error={error}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </AuthFormLayout>
  );
}

export default memo(ForgotPassword);
