import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import AuthInput from "../../components/inputs/AuthInput";
import Button from "../../components/buttons/Button";
import { resetPasswordSchema } from "../../schemas/authSchemas";
import { getUserData, updateUserData } from "../../utilities/userStorage";
import toast from "react-hot-toast";

function ChangePasswordPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const canSubmit =
    formData.currentPassword.trim() !== "" &&
    formData.newPassword.trim() !== "" &&
    formData.confirmNewPassword.trim() !== "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const storedUser = getUserData();

    if (!formData.currentPassword) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: "Current password is required",
      }));
      return;
    }

    if (storedUser?.password !== formData.currentPassword) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: "Current password is incorrect",
      }));
      return;
    }

    const result = resetPasswordSchema.safeParse({
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmNewPassword,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        newPassword: fieldErrors.newPassword?.[0] ?? "",
        confirmNewPassword: fieldErrors.confirmPassword?.[0] ?? "",
      }));
      return;
    }

    if (formData.newPassword === formData.currentPassword) {
      setErrors((prev) => ({
        ...prev,
        newPassword: "New password must be different from current password",
      }));
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      updateUserData({ password: formData.newPassword });
      setIsLoading(false);
      navigate(-1);
      toast.success("Password changed successfully");
    }, 1500);
  }

  return (
    <SubPageLayout title="Password">
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-dark md:text-3xl">
          Change Password
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-gray-semi-dark">
          Keep your account protected with a unique password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current password */}
        <AuthInput
          label="Current Password"
          type="password"
          icon="solar:lock-password-linear"
          isPassword
          name="currentPassword"
          backgroundColor="bg-gray-lightest"
          placeholder="Enter your current password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />

        {/* New password */}
        <AuthInput
          label="New Password"
          type="password"
          icon="solar:lock-password-linear"
          isPassword
          name="newPassword"
          backgroundColor="bg-gray-lightest"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        {/* Confirm password */}
        <AuthInput
          label="Confirm New Password"
          type="password"
          icon="solar:lock-password-linear"
          isPassword
          name="confirmNewPassword"
          backgroundColor="bg-gray-lightest"
          placeholder="Confirm your new password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          error={errors.confirmNewPassword}
        />

        <div className="pt-5">
          <Button
            label="Change Password"
            htmlType="submit"
            loading={isLoading}
            disabled={!canSubmit || isLoading}
          />
        </div>
      </form>
    </SubPageLayout>
  );
}

export default memo(ChangePasswordPage);
