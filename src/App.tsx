import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import SignupEmail from "./pages/SignupEmailPage";
import SigninEmail from "./pages/SigninEmailPage";
import VerifyEmail from "./pages/VerifyEmailPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import Signup from "./pages/SignupPage";
import Signin from "./pages/SigninPage";
import CreatePin from "./pages/CreatePinPage";
import ResetPassword from "./pages/RestPasswordPage";
import Dashboard from "./pages/DashboardPage";
export default function App() {
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
