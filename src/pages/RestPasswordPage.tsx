import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <AuthFormLayout
      title="Reset your password"
      subtitle="Create a new password to regain access to your account."
      linkTo=""
      buttonLabel="Reset Password"
      onSubmit={handleSubmit}
    >
      {/* New Password */}
      <AuthInput
        icon="solar:lock-password-linear"
        type="password"
        label="New Password"
        placeholder="Create a new password"
        value={password}
        onChange={setPassword}
        isPassword={true}
      />

      {/* Confirm Password */}
      <AuthInput
        icon="solar:lock-password-linear"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isPassword={true}
      />
    </AuthFormLayout>
  );
}

export default memo(ResetPassword);
