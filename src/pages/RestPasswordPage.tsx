import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";
import { resetPasswordSchema } from "../schemas/authSchemas";

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "newPassword") {
      // Only check password strength rules on blur
      const fieldSchema = resetPasswordSchema.shape.newPassword;
      const result = fieldSchema.safeParse(value);
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          newPassword:
            "Password must have: 8+ characters, uppercase letter, number, special character",
        }));
      } else {
        setErrors((prev) => ({ ...prev, newPassword: "" }));
      }
    }

    if (name === "confirmPassword") {
      // Keep it silent on blur unless it's empty. Do not match check here!
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Run the full object check including the cross-field match rule on submit
    const finalCheck = resetPasswordSchema.safeParse(formData);

    if (!finalCheck.success) {
      const formattedErrors = finalCheck.error.flatten().fieldErrors;
      setErrors({
        newPassword: formattedErrors.newPassword?.[0] || "",
        confirmPassword: formattedErrors.confirmPassword?.[0] || "",
      });
      return;
    }

    // If everything matches perfectly, proceed to backend API / next screen
    setIsLoading(true);
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  }

  return (
    <AuthFormLayout
      title="Reset your password"
      subtitle="Create a new secure password to log back into your wallet dashboard."
      linkTo=""
      buttonLabel="Reset Password"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {/* New Password */}
      <AuthInput
        icon="solar:lock-password-linear"
        type="password"
        name="newPassword"
        label="New Password"
        onBlur={handleBlur}
        error={errors.newPassword}
        placeholder="Create a new password"
        value={formData.newPassword}
        onChange={handleChange}
        isPassword={true}
      />

      {/* Confirm Password */}
      <AuthInput
        icon="solar:lock-password-linear"
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        onBlur={handleBlur}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        isPassword={true}
      />
    </AuthFormLayout>
  );
}

export default memo(ResetPassword);
