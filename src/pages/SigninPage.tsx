import { memo } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../components/buttons/AuthButton";
import SplitScreenLayout from "../components/layout/SplitScreenLayout";

function SignIn() {
  const navigate = useNavigate();

  return (
    <SplitScreenLayout
      right={{
        title: "Welcome back!",
        subtitle:
          "Log in securely to access your dashboard and continue processing instant top-ups.",
      }}
      link={{
        label: "Don't have an account?",
        to: "/signup",
        linkName: "Sign up",
      }}
    >
      {/* Google Authentication Action Button */}
      <AuthButton
        icon="logos:google-icon"
        label="Continue with Google"
        onClick={() => alert("Sign in with Google")}
      />

      {/* Apple Authentication Action Button */}
      <AuthButton
        icon="bi:apple"
        label="Continue with Apple"
        onClick={() => alert("Sign in with Apple")}
      />

      {/* Layout Divider */}
      <div className="flex items-center gap-4 w-full py-2" role="separator">
        <div className="flex-1 h-0.5 bg-gray-100"></div>
        <span className="text-gray-400 text-xs font-bold tracking-wider uppercase">
          or
        </span>
        <div className="flex-1 h-0.5 bg-gray-100"></div>
      </div>

      {/* Email Sign In Action Button */}
      <AuthButton
        icon="solar:letter-linear"
        label="Sign in with Email"
        color="var(--primary)"
        onClick={() => navigate("/signin-email")}
      />
    </SplitScreenLayout>
  );
}

export default memo(SignIn);
