import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import AuthFormLayout from "../../components/layout/AuthFormLayout";
import AuthInput from "../../components/inputs/AuthInput";
import { signinEmailSchema } from "../../schemas/authSchemas";
import { getUserData, updateUserData } from "../../utilities/userStorage";

function SignInEmail() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError("");
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const fieldSchema =
      signinEmailSchema.shape[name as keyof typeof signinEmailSchema.shape];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [name]: result.error.issues[0]?.message || "Invalid input",
      }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGeneralError("");

    const result = signinEmailSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const storedUser = getUserData();

      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        updateUserData({ isLoggedIn: true });
        navigate("/dashboard", { replace: true });
      } else {
        setGeneralError("Invalid Email or Password");
      }

      setIsLoading(false);
    }, 1500);
  }

  return (
    <AuthFormLayout
      title="Sign in with Email"
      subtitle="Enter your email and password to log in and manage your secure wallet."
      linkLabel="Don't have an account?"
      linkTo="/signup"
      linkName="Sign up"
      buttonLabel="Continue"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {generalError && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-error/10 p-3.5">
          <Icon icon="solar:danger-bold" className="h-5 w-5 text-error" />
          <p className="text-sm font-medium text-error">{generalError}</p>
        </div>
      )}
      {/* Email */}
      <AuthInput
        label="Email address"
        icon="solar:letter-linear"
        type="email"
        name="email"
        error={errors.email}
        onBlur={handleBlur}
        placeholder="Enter your email address"
        value={formData.email}
        onChange={handleChange}
      />
      {/* Password */}
      <AuthInput
        label="Password"
        icon="solar:lock-password-linear"
        placeholder="Enter your password"
        type="password"
        name="password"
        error={errors.password}
        isPassword
        onBlur={handleBlur}
        value={formData.password}
        onChange={handleChange}
      />

      <p className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm hover:underline underline-offset-3 text-primary"
        >
          Forgot password?
        </Link>
      </p>
    </AuthFormLayout>
  );
}

export default memo(SignInEmail);
