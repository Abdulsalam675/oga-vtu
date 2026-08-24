import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";

function SignInEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <AuthFormLayout
      title="Sign in with Email"
      subtitle="Enter your credentials to access your dashboard and manage your account."
      linkLabel="Don't have an account?"
      linkTo="/signup"
      linkName="Sign up"
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
        placeholder="Enter your password"
        type="password"
        isPassword={true}
        value={password}
        onChange={setPassword}
      />

      <p className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm hover:underline underline-offset-3"
          style={{ color: "var(--primary)" }}
        >
          Forgot password?
        </Link>
      </p>
    </AuthFormLayout>
  );
}

export default memo(SignInEmail);
