// src/pages/HomePage.tsx
import { memo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import RecentTransactions from "../components/RecentTransactions";
import Header from "../components/Header";
import CompleteProfileModal from "../components/CompleteProfileModal";
import { updateUserData, type UserData } from "../utilities/userStorage";

type DashboardContext = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

function HomePage() {
  const { user, setUser } = useOutletContext<DashboardContext>();
  const [showCompleteProfile, setShowCompleteProfile] = useState(
    () => user !== null && user.profileComplete === false,
  );

  const profileComplete = user?.profileComplete ?? false;
  const firstName = user?.fullName?.split(" ")[0];
  const profilePicture = user?.profilePicture || "";

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
        onProfileIncomplete={() => setShowCompleteProfile(true)}
      />

      <BalanceCard balance={5000} />

      <QuickActions
        profileComplete={profileComplete}
        onProfileIncomplete={() => setShowCompleteProfile(true)}
      />

      <RecentTransactions />

      <CompleteProfileModal
        open={showCompleteProfile}
        onClose={() => setShowCompleteProfile(false)}
        onComplete={handleProfileComplete}
      />
    </div>
  );
}

export default memo(HomePage);
