import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Avatar from "../../components/dashboard/Avatar";
import CompleteProfileModal from "../../components/modals/CompleteProfileModal";
import { updateUserData } from "../../utilities/userStorage";
import toast from "react-hot-toast";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, patchUser, setUser } = useUser();
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
      subtitle: "Coming soon",
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
    switch (id) {
      case "personal":
        if (!profileComplete) {
          setShowCompleteProfile(true);
        } else {
          navigate("/dashboard/profile/personal");
        }
        break;

      case "security":
        if (!profileComplete) {
          toast.error("Complete your profile to continue");
          return;
        }

        navigate("/dashboard/profile/security");

        break;

      case "notifications":
        toast("Notifications are coming soon");
        break;

      case "support":
        navigate("/dashboard/profile/support");
        break;

      default:
        break;
    }
  }
  function handleProfileComplete(data: { fullName: string; phone: string }) {
    patchUser({
      fullName: data.fullName,
      phoneNumber: data.phone,
      profileComplete: true,
    });
    setShowCompleteProfile(false);
  }

  function handleLogout() {
    updateUserData({ isLoggedIn: false });
    setUser(null);
    navigate("/signin");
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="mb-6">
        <h1 className="text-center text-xl font-extrabold tracking-tight text-gray-dark">
          Profile
        </h1>
      </div>
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
      <section>
        <h3 className="mb-3 text-sm font-semibold text-gray-dark">Account</h3>

        <ul className="space-y-3">
          {menuItems.map((item) => {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleMenuItemClick(item.id)}
                  className="flex w-full cursor-pointer items-center gap-3.5 rounded-xl bg-white px-4 py-4 text-left transition-colors active:bg-gray-lightest"
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
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full text-error cursor-pointer items-center gap-3.5 rounded-xl bg-white px-4 py-4 text-left transition-colors active:bg-gray-lightest"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-transparent">
          <Icon icon="solar:logout-2-linear" className="h-5 w-5" />
        </div>
        Log out
      </button>

      <CompleteProfileModal
        open={showCompleteProfile}
        onClose={() => setShowCompleteProfile(false)}
        onComplete={handleProfileComplete}
      />
    </div>
  );
}

export default memo(ProfilePage);
