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
          "Fast, reliable payments. Instant airtime, data bundles, and bill utilities right here.",
      }}
      link={{
        label: "Already have an account?",
        to: "/signin",
        linkName: "Sign In",
      }}
      footer={
        <p className="text-center text-xs md:text-sm text-gray-normal mt-4 leading-relaxed">
          By signing up, you agree to our{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:opacity-75 transition-opacity text-primary"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            to="/terms"
            className="underline underline-offset-2 hover:opacity-75 transition-opacity text-primary"
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
        <div className="flex-1 h-0.5 bg-gray-lightest"></div>
        <span className="text-gray-light text-xs font-bold tracking-wider uppercase">
          or
        </span>
        <div className="flex-1 h-0.5 bg-gray-lightest"></div>
      </div>

      {/* Email Registration Action Button */}
      <AuthButton
        icon="solar:letter-linear"
        label="Sign up with Email"
        color="text-primary"
        onClick={() => navigate("/signup-email")}
      />
    </SplitScreenLayout>
  );
}

export default memo(SignUp);
