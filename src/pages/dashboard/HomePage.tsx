import { memo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CompleteProfileModal from "../../components/modals/CompleteProfileModal";
import { updateUserData, type UserData } from "../../utilities/userStorage";
import Header from "../../components/dashboard/Header";
import BalanceCard from "../../components/dashboard/BalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

type DashboardContext = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const HIDE_AMOUNT_KEY = "hideAmount";

function getStoredHideAmount() {
  try {
    return localStorage.getItem(HIDE_AMOUNT_KEY) === "true";
  } catch {
    return false;
  }
}

function HomePage() {
  const { user, setUser } = useOutletContext<DashboardContext>();
  const [hideAmount, setHideAmount] = useState(getStoredHideAmount);
  const [showCompleteProfile, setShowCompleteProfile] = useState(
    () => user !== null && user.profileComplete === false,
  );

  const profileComplete = user?.profileComplete ?? false;
  const firstName = user?.fullName?.split(" ")[0];
  const profilePicture = user?.profilePicture || "";

  function handleToggleHideAmount() {
    setHideAmount((prev) => {
      const next = !prev;
      localStorage.setItem(HIDE_AMOUNT_KEY, String(next));
      return next;
    });
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

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pt-20">
      <Header
        firstName={firstName}
        profileComplete={profileComplete}
        profilePicture={profilePicture}
        notificationCount={3}
      />

      <BalanceCard
        balance={5000}
        hideAmount={hideAmount}
        setHideAmount={handleToggleHideAmount}
        showProfileBanner={!profileComplete}
        onBannerClick={() => setShowCompleteProfile(true)}
      />

      <QuickActions
        profileComplete={profileComplete}
        onProfileIncomplete={() => setShowCompleteProfile(true)}
      />

      <RecentTransactions hideAmount={hideAmount} />

      <CompleteProfileModal
        open={showCompleteProfile}
        onClose={() => setShowCompleteProfile(false)}
        onComplete={handleProfileComplete}
      />
    </div>
  );
}

export default memo(HomePage);
