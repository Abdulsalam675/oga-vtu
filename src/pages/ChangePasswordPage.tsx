import { memo, useState } from "react";
import SubPageLayout from "../components/layout/SubPageLayout";
import AuthInput from "../components/AuthInput";
import Button from "../components/buttons/Button";

function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Direct submit action
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  return (
    <SubPageLayout title="Password">
      {/* Title and Subtitle */}
      <div className="mb-8 text-left">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-dark md:text-3xl">
          Change Password
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-gray-semi-dark">
          Keep your account protected with a unique password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
        />

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
        />

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
        />

        <div className="pt-5">
          <Button
            label="Change Password"
            htmlType="submit"
            loading={isLoading}
          />
        </div>
      </form>
    </SubPageLayout>
  );
}

export default memo(ChangePasswordPage);
