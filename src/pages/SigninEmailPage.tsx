import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import AuthInput from "../components/AuthInput";
import { signinEmailSchema } from "../schemas/authSchemas";

function SignInEmail() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

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
      navigate("/dashboard");
    }, 2000);  // 2 second delay
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
      {/* Email Input Field */}
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

      {/* Password Input Field */}
      <AuthInput
        label="Password"
        icon="solar:lock-password-linear"
        placeholder="Enter your password"
        type="password"
        name="password"
        error={errors.password}
        isPassword={true}
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
