// src/components/CompleteProfileModal.tsx
import { memo, useState } from "react";
import Modal from "../components/Modal";
import AuthInput from "../components/AuthInput";
import Button from "../components/buttons/Button";
import { fullNameSchema, phoneNumberSchema } from "../schemas/authSchemas";
import { updateUserData } from "../utilities/userStorage";
import { capitalizeWords } from "../utilities/capitalizeWords";

interface CompleteProfileModalProps {
  open: boolean;
  onClose?: () => void;
  onComplete?: (data: { fullName: string; phone: string }) => void;
}

function CompleteProfileModal({
  open,
  onClose,
  onComplete,
}: CompleteProfileModalProps) {
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [errors, setErrors] = useState({ fullName: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // Validate individual field
    if (name === "fullName") {
      const result = fullNameSchema.safeParse({ fullName: value });
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [name]: result.error.issues[0]?.message || "Invalid input",
        }));
      }
    } else if (name === "phone") {
      const result = phoneNumberSchema.safeParse({ phone: value });
      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          [name]: result.error.issues[0]?.message || "Invalid input",
        }));
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({ fullName: "", phone: "" });

    // Validate full name
    const fullNameResult = fullNameSchema.safeParse({
      fullName: formData.fullName,
    });
    if (!fullNameResult.success) {
      const fieldErrors = fullNameResult.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        fullName: fieldErrors.fullName?.[0] ?? "",
      }));
      return;
    }

    // Validate phone
    const phoneResult = phoneNumberSchema.safeParse({
      phone: formData.phone,
    });
    if (!phoneResult.success) {
      const fieldErrors = phoneResult.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        phone: fieldErrors.phone?.[0] ?? "",
      }));
      return;
    }

    // All validations passed
    setIsLoading(true);

    setTimeout(() => {
      const capitalizedName = capitalizeWords(formData.fullName);

      if (onComplete) {
        onComplete({
          fullName: capitalizedName,
          phone: formData.phone.trim(),
        });
      }

      updateUserData({
        fullName: capitalizedName,
        phoneNumber: formData.phone.trim(),
        profileComplete: true,
      });

      setIsLoading(false);
    }, 1500);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-6">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-dark">
          Complete your profile
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-light">
          Add your name and phone number to start buying airtime, data, and
          bills.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthInput
          label="Full name"
          icon="solar:user-linear"
          name="fullName"
          type="text"
          placeholder="Abdulsalam Umoru"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />

        <AuthInput
          label="Phone number"
          icon="solar:phone-linear"
          name="phone"
          type="tel"
          placeholder="0801 234 5678"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
        />

        <Button
          label="Save"
          htmlType="submit"
          loading={isLoading}
          disabled={
            !formData.fullName.trim() || !formData.phone.trim() || isLoading
          }
        />

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer py-2 text-center text-sm font-semibold text-gray-light"
          >
            Do this later
          </button>
        )}
      </form>
    </Modal>
  );
}

export default memo(CompleteProfileModal);
