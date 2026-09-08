// src/App.tsx
import { memo, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./index.css";

import Signup from "./pages/SignupPage";
import Signin from "./pages/SigninPage";
import SignupEmail from "./pages/SignupEmailPage";
import SigninEmail from "./pages/SigninEmailPage";
import VerifyEmail from "./pages/VerifyEmailPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/RestPasswordPage";
import CreatePin from "./pages/CreatePinPage";

import DashboardLayout from "./components/layout/DashboardLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import SecurityPage from "./pages/SecurityPage";
import SupportPage from "./pages/SupportPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 730);

  useEffect(function () {
    function handleResize() {
      setIsMobile(window.innerWidth < 730);
    }

    window.addEventListener("resize", handleResize);
    return function () {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMobile) {
    return <MobileOnlyMessage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup-email" element={<SignupEmail />} />
        <Route path="/signin-email" element={<SigninEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify-email" element={<VerifyEmail />} />
        <Route
          path="/forgot-password/reset-password"
          element={<ResetPassword />}
        />
        <Route path="/create-pin" element={<CreatePin />} />

        {/* Dashboard (mobile shell) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="services"
            element={<div className="text-gray-dark">Services coming next</div>}
          />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/personal" element={<PersonalInfoPage />} />
          <Route path="profile/security" element={<SecurityPage />} />
          <Route path="profile/support" element={<SupportPage />} />
          <Route
            path="profile/security/change-password"
            element={<ChangePasswordPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);

function MobileOnlyMessage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-extra-light px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon
              icon="solar:smartphone-linear"
              className="h-8 w-8 text-primary"
            />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-gray-dark">
          Open on mobile
        </h1>

        <p className="mt-3 text-base text-gray-semi-dark">
          This application is currently optimised for mobile screens.
        </p>

        <p className="mt-4 text-sm text-gray-light">
          Please switch to a mobile device or use mobile view to access the app.
        </p>
      </div>
    </div>
  );
}
