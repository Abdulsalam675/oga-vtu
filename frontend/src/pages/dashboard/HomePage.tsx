import { memo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CompleteProfileModal from "../../components/modals/CompleteProfileModal";
import { useUser } from "../../context/UserContext";
import Header from "../../components/dashboard/Header";
import BalanceCard from "../../components/dashboard/BalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import { useTransactions } from "../../context/TransactionsContext";

function HomePage() {
  const { isLoadingUser } = useOutletContext<{ isLoadingUser: boolean }>();
  const { user, patchUser } = useUser();
  const { balance } = useTransactions();
  const [hideAmount, setHideAmount] = useState(user?.hideAmount ?? false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);

  const profileComplete = user?.profileComplete ?? false;
  const BvnVerified = user?.BvnVerified ?? false;
  const firstName = user?.fullName?.split(" ")[0];
  const profilePicture = user?.profilePicture || "";

  function handleToggleHideAmount() {
    const nextHideAmount = !hideAmount;
    patchUser({ hideAmount: nextHideAmount });
    setHideAmount(nextHideAmount);
  }

  function handleProfileComplete(data: { fullName: string; phone: string }) {
    patchUser({
      fullName: data.fullName,
      phoneNumber: data.phone,
      profileComplete: true,
    });
    setShowCompleteProfile(false);
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 pt-20">
      <Header
        firstName={firstName}
        profileComplete={profileComplete}
        profilePicture={profilePicture}
      />
      <BalanceCard
        balance={balance}
        isLoading={isLoadingUser}
        hideAmount={hideAmount}
        setHideAmount={handleToggleHideAmount}
        showProfileBanner={!profileComplete}
        BvnVerified={BvnVerified}
        profileComplete={profileComplete}
        onBannerClick={() => setShowCompleteProfile(true)}
      />

      <QuickActions profileComplete={profileComplete} />

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
