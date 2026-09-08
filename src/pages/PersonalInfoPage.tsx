// src/pages/PersonalInfoPage.tsx
import { memo, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { updateUserData, type UserData } from "../utilities/userStorage";
import AuthInput from "../components/AuthInput";
import Avatar from "../components/Avatar";
import SubPageLayout from "../components/layout/SubPageLayout";

type DashboardContext = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

function PersonalInfoPage() {
  const { user, setUser } = useOutletContext<DashboardContext>();
  const fileRef = useRef<HTMLInputElement>(null);

  const fullName = user?.fullName || "";
  const phone = user?.phoneNumber || "";
  const email = user?.email || "";

  function handleAvatarClick() {
    fileRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target?.result as string;

      const next = updateUserData({
        profilePicture: base64String,
      });

      if (next) {
        setUser(next);
      }
    };
    reader.readAsDataURL(file);
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
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="space-y-4">
        <AuthInput
          label="Full name"
          icon="solar:user-linear"
          name="fullName"
          type="text"
          placeholder="—"
          backgroundColor="bg-gray-lightest"
          value={fullName}
          readOnly
          onChange={() => {}}
        />

        <AuthInput
          label="Phone number"
          icon="solar:phone-linear"
          name="phone"
          type="text"
          placeholder="—"
          backgroundColor="bg-gray-lightest"
          value={phone}
          readOnly
          onChange={() => {}}
        />

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
      </div>
    </SubPageLayout>
  );
}

export default memo(PersonalInfoPage);
