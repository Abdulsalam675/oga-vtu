// src/pages/dashboard/HomePage.tsx
import { memo } from "react";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import RecentTransactions from "../components/RecentTransactions";
function HomePage() {
  function handleFundClick() {
    // later: navigate to fund wallet
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-7">
      <BalanceCard balance={567.78887} onFundClick={handleFundClick} />

      <QuickActions />
      <RecentTransactions />
    </div>
  );
}

export default memo(HomePage);
