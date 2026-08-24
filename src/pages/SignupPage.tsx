// src/pages/SignupPage.tsx
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import AuthButton from "../components/buttons/AuthButton";
import SplitScreenLayout from "../components/layout/SplitScreenLayout";
import { Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  return (
    <SplitScreenLayout
      right={{
        title: "Get started for free.",
        subtitle:
          "Your comfort, our speed. Secure your instant airtime, data, and bill tokens here.",
      }}
      link={{
        label: "Already have an account?",
        to: "/signin",
        linkName: "Sign In",
      }}
      footer={
        <p className="text-center text-xs text-gray-400 mt-8 leading-relaxed max-w-sm mx-auto">
          By signing up, you agree to our{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:opacity-75 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/terms"
            className="underline underline-offset-2 hover:opacity-75 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            Terms of Service
          </Link>
        </p>
      }
    >
      {/* Google Authentication Action Button */}
      <AuthButton
        icon="logos:google-icon"
        label="Continue with Google"
        onClick={() => alert("Sign up with Google")}
      />

      {/* Apple Authentication Action Button */}
      <AuthButton
        icon="bi:apple"
        label="Continue with Apple"
        onClick={() => alert("Sign up with Apple")}
      />

      {/* Layout Divider */}
      <div className="flex items-center gap-4 w-full py-2" role="separator">
        <div className="flex-1 h-0.5 bg-gray-100"></div>
        <span className="text-gray-400 text-xs font-bold tracking-wider uppercase">
          or
        </span>
        <div className="flex-1 h-0.5 bg-gray-100"></div>
      </div>

      {/* Email Registration Action Button */}
      <AuthButton
        icon="solar:letter-linear"
        label="Sign up with Email"
        color="var(--primary)"
        onClick={() => navigate("/signup-email")}
      />
    </SplitScreenLayout>
  );
}

export default memo(SignUp);
