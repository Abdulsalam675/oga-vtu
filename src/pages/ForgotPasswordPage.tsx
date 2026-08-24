import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/forgot-password/verify-email");
  }

  return (
    <AuthFormLayout
      title="Reset Password"
      subtitle="Enter your email address below and we'll send you an OTP code to securely reset your account password."
      linkLabel="Remember your password?"
      linkTo="/signin"
      linkName="Sign In"
      buttonLabel="Send Reset Code"
      onSubmit={handleSubmit}
    >
      <AuthInput
        label="Email address"
        icon="solar:letter-linear"
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={setEmail}
      />
    </AuthFormLayout>
  );
}

export default memo(ForgotPassword);
