import { memo, useState } from "react";
import Modal from "../layout/Modal";
import { fullNameSchema, phoneNumberSchema } from "../../schemas/authSchemas";
import { capitalizeWords } from "../../utilities/capitalizeWords";
import { updateUserData } from "../../utilities/userStorage";
import AuthInput from "../inputs/AuthInput";
import Button from "../buttons/Button";
import toast from "react-hot-toast";

interface CompleteProfileModalProps {
  open: boolean;
  onClose?: () => void;
  onComplete?: (data: { fullName: string; phone: string }) => void;
}

interface FormData {
  fullName: string;
  phone: string;
}

interface FormErrors {
  fullName: string;
  phone: string;
}

function CompleteProfileModal({
  open,
  onClose,
  onComplete,
}: CompleteProfileModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

      return;
    }

    if (name === "fullName") {
      const result = fullNameSchema.safeParse({
        fullName: value,
      });

      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          fullName:
            result.error.issues[0]?.message ?? "Please enter a valid name",
        }));
      }
    }

    if (name === "phone") {
      const result = phoneNumberSchema.safeParse({
        phone: value,
      });

      if (!result.success) {
        setErrors((prev) => ({
          ...prev,
          phone:
            result.error.issues[0]?.message ??
            "Please enter a valid phone number",
        }));
      }
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isLoading) return;

    setErrors({
      fullName: "",
      phone: "",
    });

    const fullNameResult = fullNameSchema.safeParse({
      fullName: formData.fullName.trim(),
    });

    const phoneResult = phoneNumberSchema.safeParse({
      phone: formData.phone.trim(),
    });

    if (!fullNameResult.success || !phoneResult.success) {
      setErrors({
        fullName: fullNameResult.error?.issues[0]?.message ?? "",
        phone: phoneResult.error?.issues[0]?.message ?? "",
      });

      return;
    }

    setIsLoading(true);

    // Simulate API request for now.
    setTimeout(() => {
      const fullName = capitalizeWords(formData.fullName.trim());
      const phone = formData.phone.trim();

      updateUserData({
        fullName,
        phoneNumber: phone,
        profileComplete: true,
      });

      onComplete?.({
        fullName,
        phone,
      });

      setIsLoading(false);

      toast.success("Profile completed successfully");
    }, 1000);
  }

  function handleClose() {
    if (isLoading) return;

    setFormData({
      fullName: "",
      phone: "",
    });

    setErrors({
      fullName: "",
      phone: "",
    });

    onClose?.();
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-dark">
          Complete your profile
        </h2>

        <p className="mt-1.5 text-sm leading-relaxed text-gray-light">
          Add your name and phone number to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 mb-5" noValidate>
        {/* Full name */}
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

        {/* Phone number */}
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

        <div className="pt-2">
          <Button
            label="Continue"
            htmlType="submit"
            loading={isLoading}
            disabled={
              !formData.fullName.trim() || !formData.phone.trim() || isLoading
            }
          />
        </div>
      </form>
    </Modal>
  );
}

export default memo(CompleteProfileModal);
