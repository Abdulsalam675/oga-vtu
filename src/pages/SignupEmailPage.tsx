import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";

function SignUpEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        placeholder="Enter your email address"
        value={email}
        onChange={setEmail}
      />

      {/* Password Input Field */}
      <AuthInput
        label="Password"
        icon="solar:lock-password-linear"
        placeholder="Create a secure password"
        type="password"
        isPassword={true}
        value={password}
        onChange={setPassword}
      />
    </AuthFormLayout>
  );
}

export default memo(SignUpEmail);
