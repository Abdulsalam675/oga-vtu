import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";
import { signupEmailSchema } from "../schemas/authSchemas";

function SignUpEmail() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.issues[0]?.message || "Invalid input",
      }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = signupEmailSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate("/verify-email");
    }, 2000); // two seconds delay
  }

  return (
    <AuthFormLayout
      title="Create your account"
      subtitle="Enter your email and create a password to set up your secure wallet."
      linkLabel="Already have an account?"
      linkTo="/signin"
      linkName="Sign In"
      buttonLabel="Continue"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
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
