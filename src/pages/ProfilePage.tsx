// src/pages/dashboard/ProfilePage.tsx
import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { type UserData } from "../utilities/userStorage";
import Avatar from "../components/Avatar";
import CompleteProfileModal from "../components/CompleteProfileModal";
import { updateUserData } from "../utilities/userStorage";

type DashboardContext = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext<DashboardContext>();
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);

  const displayName = user?.fullName?.trim() || "Complete your profile";
  const phone = user?.phoneNumber || "—";
  const fullName = user?.fullName;
  const profilePicture = user?.profilePicture;
  const profileComplete = user?.profileComplete ?? false;

  const menuItems = [
    {
      id: "personal",
      label: "Personal information",
      subtitle: "Name, phone, email",
      icon: "solar:user-linear",
    },
    {
      id: "security",
      label: "Security",
      subtitle: "Password, PIN",
      icon: "solar:shield-keyhole-linear",
    },
    {
      id: "notifications",
      label: "Notifications",
      subtitle: "Alerts and preferences",
      icon: "solar:bell-linear",
    },
    {
      id: "support",
      label: "Help & support",
      subtitle: "FAQs and contact us",
      icon: "solar:help-linear",
    },
  ];

  function handleMenuItemClick(id: string) {
    if (!profileComplete) {
      setShowCompleteProfile(true);
      return;
    }

    switch (id) {
      case "personal":
        navigate("/dashboard/profile/personal");
        break;
      case "security":
        navigate("/dashboard/profile/security");
        break;
      case "notifications":
        navigate("/dashboard/profile/notifications");
        break;
      case "support":
        navigate("/dashboard/profile/support");
        break;
      default:
        break;
    }
  }

  function handleProfileComplete(data: { fullName: string; phone: string }) {
    const next = updateUserData({
      fullName: data.fullName,
      phoneNumber: data.phone,
      profileComplete: true,
    });

    if (next) {
      setUser(next);
    }
    setShowCompleteProfile(false);
  }

  function handleLogout() {
    updateUserData({ isLoggedIn: false });
    setUser(null);
    navigate("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="mb-8">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-dark text-center">
          Profile
        </h1>
      </div>

      {/* User Card */}
      <section className="rounded-2xl bg-white p-5">
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => handleMenuItemClick("personal")}
            className="cursor-pointer"
          >
            <Avatar size="lg" name={fullName} profilePicture={profilePicture} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-extrabold text-gray-dark">
              {displayName}
            </h2>
            <p className="mt-1 truncate text-sm text-gray-light">{phone}</p>
          </div>
        </div>
      </section>

      {/* Account Menu */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-dark">Account</h3>

        <ul className="space-y-2">
          {menuItems.map(function (item) {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleMenuItemClick(item.id)}
                  className="flex w-full items-center gap-3.5 rounded-xl bg-white px-4 py-4 text-left transition-colors active:bg-gray-lightest"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon icon={item.icon} className="h-5 w-5 text-primary" />
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
      </section>

      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-4 text-sm font-semibold text-error transition-colors active:bg-gray-lightest"
      >
        Log out
      </button>

      {/* Complete Profile Modal */}
      <CompleteProfileModal
        open={showCompleteProfile}
        onClose={() => setShowCompleteProfile(false)}
        onComplete={handleProfileComplete}
      />
    </div>
  );
}

export default memo(ProfilePage);
