import { memo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "../../context/UserContext";
import { fullNameSchema, phoneNumberSchema } from "../../schemas/authSchemas";
import AuthInput from "../../components/inputs/AuthInput";
import Avatar from "../../components/dashboard/Avatar";
import Button from "../../components/buttons/Button";
import SubPageLayout from "../../components/layout/SubPageLayout";
import toast from "react-hot-toast";

function PersonalInfoPage() {
  const { user, patchUser } = useUser();
  const fileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const email = user?.email || "";

  const [errors, setErrors] = useState({ fullName: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasChanges =
    fullName.trim() !== (user?.fullName || "") ||
    phone.trim() !== (user?.phoneNumber || "");

  function handleAvatarClick() {
    fileRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      patchUser({ profilePicture: base64String });
    };
    reader.readAsDataURL(file);
  }

  function handleFullNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFullName(e.target.value);
    setErrors((prev) => ({ ...prev, fullName: "" }));
    setSaved(false);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(e.target.value.replace(/\D/g, ""));
    setErrors((prev) => ({ ...prev, phone: "" }));
    setSaved(false);
  }

  function handleSave() {
    const nameResult = fullNameSchema.safeParse({ fullName });
    const phoneResult = phoneNumberSchema.safeParse({ phone });

    if (!nameResult.success || !phoneResult.success) {
      setErrors({
        fullName: nameResult.success
          ? ""
          : nameResult.error.issues[0]?.message || "",
        phone: phoneResult.success
          ? ""
          : phoneResult.error.issues[0]?.message || "",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      patchUser({
        fullName: fullName.trim(),
        phoneNumber: phone.trim(),
        profileComplete: true,
      });

      setIsLoading(false);
      setSaved(true);
      toast.success("Profile updated successfully");
    }, 1500);
  }

  return (
    <SubPageLayout title="Edit Profile">
      <div className="mb-8 flex justify-center">
        <Avatar
          name={fullName}
          profilePicture={user?.profilePicture}
          size="xl"
          editable
          onEditClick={handleAvatarClick}
        />
        {/* Profile picture */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          autoComplete="off"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-4">
        {/* Full name */}
        <AuthInput
          label="Full name"
          icon="solar:user-linear"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          backgroundColor="bg-gray-lightest"
          value={fullName}
          onChange={handleFullNameChange}
          error={errors.fullName}
        />

        {/* Phone number */}
        <AuthInput
          label="Phone number"
          icon="solar:phone-linear"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          backgroundColor="bg-gray-lightest"
          value={phone}
          onChange={handlePhoneChange}
          error={errors.phone}
        />

        <div>
          {/* Email */}
          <AuthInput
            label="Email"
            icon="solar:letter-linear"
            name="email"
            type="email"
            placeholder="—"
            backgroundColor="bg-gray-lightest"
            value={email}
            readOnly
            onChange={() => {}}
          />
          <p className="mt-1.5 flex items-center gap-1 pl-3 text-xs text-gray-light">
            <Icon
              icon="solar:lock-keyhole-minimalistic-linear"
              className="h-3.5 w-3.5"
            />
            Email can't be changed here
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button
          label={saved ? "Saved" : "Save changes"}
          htmlType="button"
          loading={isLoading}
          disabled={!hasChanges || isLoading}
          onClick={handleSave}
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(PersonalInfoPage);
