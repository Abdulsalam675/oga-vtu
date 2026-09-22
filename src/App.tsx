import { memo, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Toaster } from "react-hot-toast";
import "./index.css";

import Signup from "./pages/auth/SignupPage";
import Signin from "./pages/auth/SigninPage";
import SignupEmail from "./pages/auth/SignupEmailPage";
import SigninEmail from "./pages/auth/SigninEmailPage";
import VerifyEmail from "./pages/auth/VerifyEmailPage";
import ForgotPassword from "./pages/auth/ForgotPasswordPage";
import ResetPassword from "./pages/auth/RestPasswordPage";
import CreatePin from "./pages/auth/CreatePinPage";

import DashboardWithNavLayout from "./components/layout/DashboardWithNavLayout";

import HomePage from "./pages/dashboard/HomePage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import HistoryPage from "./pages/dashboard/HistoryPage";
import TransactionDetailsPage from "./pages/dashboard/TransactionDetailsPage";
import PersonalInfoPage from "./pages/profile/PersonalInfoPage";
import SecurityPage from "./pages/profile/SecurityPage";
import SupportPage from "./pages/profile/SupportPage";
import ChangePasswordPage from "./pages/profile/ChangePasswordPage";
import AirtimePage from "./pages/airtime/AirtimePage";
import AirtimeConfirmPage from "./pages/airtime/AirtimeConfirmPage";
import DataPage from "./pages/data/DataPage";
import MainLayout from "./components/layout/MainLayout";
import AirtimeSuccessPage from "./pages/airtime/AirtimeSuccessPage";
import DataConfirmPage from "./pages/data/DataConfirmPage";
import DataSuccessPage from "./pages/data/DataSuccessPage";
import ElectricityPage from "./pages/electricity/ElectricityPage";
import ElectricityConfirmPage from "./pages/electricity/ElectricityConfirmPage";
import ElectricitySuccessPage from "./pages/electricity/ElectricitySuccessPage";
import CableTvPage from "./pages/cable-tv/CableTvPage";
import CableTvConfirmPage from "./pages/cable-tv/CableTvConfirmPage";
import CableTvSuccessPage from "./pages/cable-tv/CableTvSuccessPage";
import ChangePinPage from "./pages/profile/ChangePinPage";
import ServicesPage from "./pages/dashboard/ServicesPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import TransferPage from "./pages/transfer/TransferPage";
import TransferAmountPage from "./pages/transfer/TransferAmountPage";
import TransferConfirmPage from "./pages/transfer/TransferConfirmPage";
import TransferSuccessPage from "./pages/transfer/TransferSuccessPage";
import { UserProvider } from "./context/UserContext";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 730);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 730);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isMobile) {
    return <MobileOnlyMessage />;
  }

  return (
    <BrowserRouter>
      <Routes>
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

        <Route
          path="/dashboard"
          element={
            <UserProvider>
              <MainLayout />
            </UserProvider>
          }
        >
          <Route element={<DashboardWithNavLayout />}>
            <Route index element={<HomePage />} />
            <Route path="history" element={<HistoryPage />} />

            <Route path="services" element={<ServicesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="transfer" element={<TransferPage />} />
          <Route path="transfer/amount" element={<TransferAmountPage />} />
          <Route path="transfer/confirm" element={<TransferConfirmPage />} />
          <Route path="transfer/success" element={<TransferSuccessPage />} />
          <Route path="airtime" element={<AirtimePage />} />
          <Route path="airtime/confirm" element={<AirtimeConfirmPage />} />
          <Route path="airtime/success" element={<AirtimeSuccessPage />} />
          <Route path="data" element={<DataPage />} />
          <Route path="data/confirm" element={<DataConfirmPage />} />
          <Route path="data/success" element={<DataSuccessPage />} />
          <Route path="electricity" element={<ElectricityPage />} />
          <Route
            path="electricity/confirm"
            element={<ElectricityConfirmPage />}
          />
          <Route
            path="electricity/success"
            element={<ElectricitySuccessPage />}
          />
          <Route path="cable-tv" element={<CableTvPage />} />
          <Route path="cable-tv/confirm" element={<CableTvConfirmPage />} />
          <Route path="cable-tv/success" element={<CableTvSuccessPage />} />
          <Route
            path="transaction-details"
            element={<TransactionDetailsPage />}
          />
          <Route path="more-services" element={<ServicesPage />} />
          <Route path="profile/personal" element={<PersonalInfoPage />} />
          <Route path="profile/security" element={<SecurityPage />} />
          <Route path="profile/support" element={<SupportPage />} />
          <Route
            path="profile/security/change-password"
            element={<ChangePasswordPage />}
          />
          <Route
            path="profile/security/change-pin"
            element={<ChangePinPage />}
          />
        </Route>
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
          style: {
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "12px",
            maxWidth: "420px",
          },
        }}
      />
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
