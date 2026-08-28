import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";
import { signupEmailSchema } from "../schemas/authSchemas";

function SignUpEmail() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const fieldSchema =
      signupEmailSchema.shape[name as keyof typeof signupEmailSchema.shape];

    const result = fieldSchema.safeParse(value);

    if (result.success) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      const errorMesage = result.error.issues[0]?.message || "Invalid input";
      setErrors((prev) => ({ ...prev, [name]: errorMesage }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/verify-email");
  }

  return (
    <AuthFormLayout
      title="Create your account"
      subtitle="Enter your email and create a password to set up your wallet profile."
      linkLabel="Already have an account?"
      linkTo="/signin"
      linkName="Sign In"
      buttonLabel="Continue"
      onSubmit={handleSubmit}
    >
      {/* Email Input Field */}
      <AuthInput
        label="Email address"
        icon="solar:letter-linear"
        type="email"
        name="email"
        placeholder="Enter your email address"
        onBlur={handleBlur}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      {/* Password Input Field */}
      <AuthInput
        label="Password"
        icon="solar:lock-password-linear"
        placeholder="Create a secure password"
        type="password"
        name="password"
        onBlur={handleBlur}
        isPassword={true}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
    </AuthFormLayout>
  );
}

export default memo(SignUpEmail);
