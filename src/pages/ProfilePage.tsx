// src/pages/dashboard/ProfilePage.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileComplete?: boolean;
}

function ProfilePage({
  firstName,
  lastName,
  email = "user@email.com",
  phone,
  profileComplete = false,
}: ProfilePageProps) {
  const navigate = useNavigate();

  const displayName =
    profileComplete && firstName
      ? `${firstName}${lastName ? ` ${lastName}` : ""}`
      : "Complete your profile";

  const initials =
    profileComplete && firstName ? firstName.charAt(0).toUpperCase() : null;

  function handleCompleteProfile() {
    // later: open modal or go to /complete-profile
  }

  function handleLogout() {
    // later: clear auth and redirect
    navigate("/signin");
  }

  const menuItems = [
    {
      id: "personal",
      label: "Personal details",
      subtitle: profileComplete
        ? "Name, phone number"
        : "Add your name and phone",
      icon: "solar:user-linear",
      onClick: handleCompleteProfile,
    },
    {
      id: "security",
      label: "Security",
      subtitle: "PIN, password",
      icon: "solar:shield-keyhole-linear",
      onClick: function () {},
    },
    {
      id: "notifications",
      label: "Notifications",
      subtitle: "SMS and push alerts",
      icon: "solar:bell-linear",
      onClick: function () {},
    },
    {
      id: "support",
      label: "Help & support",
      subtitle: "FAQs and contact us",
      icon: "solar:help-linear",
      onClick: function () {},
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-gray-dark md:text-2xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-gray-light">
          Manage your account and security
        </p>
      </div>

      {/* Identity card */}
      <div className="rounded-2xl bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-white">
            {initials ? (
              initials
            ) : (
              <Icon icon="solar:user-linear" className="h-6 w-6" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-base font-extrabold text-gray-dark">
              {displayName}
            </p>
            <p className="mt-0.5 text-sm text-gray-light">{email}</p>
            {phone && <p className="mt-0.5 text-sm text-gray-light">{phone}</p>}
          </div>
        </div>

        {!profileComplete && (
          <button
            type="button"
            onClick={handleCompleteProfile}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Icon icon="solar:user-plus-linear" className="h-4 w-4" />
            Complete profile
          </button>
        )}
      </div>

      {/* Menu */}
      <ul className="overflow-hidden rounded-2xl bg-white">
        {menuItems.map(function (item, index) {
          const isLast = index === menuItems.length - 1;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={item.onClick}
                className={
                  "flex w-full cursor-pointer items-center gap-3 p-4 text-left transition-colors active:bg-gray-extra-light " +
                  (!isLast ? "border-b border-gray-lightest" : "")
                }
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-extra-light">
                  <Icon icon={item.icon} className="h-5 w-5 text-gray-dark" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-dark">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-light">
                    {item.subtitle}
                  </p>
                </div>

                <Icon
                  icon="solar:alt-arrow-right-linear"
                  className="h-5 w-5 shrink-0 text-gray-light"
                />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-error transition-colors active:bg-gray-extra-light"
      >
        <Icon icon="solar:logout-2-linear" className="h-5 w-5" />
        Log out
      </button>
    </div>
  );
}

export default memo(ProfilePage);
