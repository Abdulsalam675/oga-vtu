import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import FundWalletModal from "../modals/FundWalletModal";

interface BalanceCardProps {
  balance?: number;
  onFundClick?: () => void;
  showProfileBanner?: boolean;
  onBannerClick?: () => void;
  setHideAmount: () => void;
  hideAmount: boolean;
}

function BalanceCard({
  balance = 0,
  showProfileBanner = false,
  onBannerClick,
  hideAmount,
  setHideAmount,
}: BalanceCardProps) {
  const [showFundModal, setShowFundModal] = useState(false);

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(balance);

  return (
    <div className="relative">
      {showProfileBanner && (
        <div
          onClick={onBannerClick}
          className="-mb-5 flex cursor-pointer items-center justify-between gap-2 rounded-t-2xl border border-amber-100 bg-amber-50 px-4 pt-3 pb-8 transition-colors hover:bg-amber-100/80"
        >
          <div className="flex min-w-0 items-center gap-2">
            <Icon
              icon="solar:shield-warning-bold"
              className="h-4 w-4 shrink-0 text-amber-600"
            />
            <span className="truncate text-xs font-semibold text-amber-700">
              Complete your profile to unlock all features
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-700">
            <span>Complete</span>
            <Icon icon="solar:alt-arrow-right-linear" className="h-3.5 w-3.5" />
          </div>
        </div>
      )}
      <section className="relative z-10 overflow-hidden rounded-2xl bg-primary p-5 text-white shadow-lg md:p-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/11" />
        <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/7" />
        <div className="relative">
          <div className="mb-2 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-white/83">
                Wallet balance
              </p>
              <button
                type="button"
                onClick={setHideAmount}
                aria-label={hideAmount ? "Hide balance" : "Show balance"}
                className="cursor-pointer transition-opacity hover:opacity-82"
              >
                <Icon
                  icon={hideAmount ? "mdi:eye-off" : "solar:eye-bold"}
                  className="h-5 w-5 text-white/76"
                />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowFundModal(true)}
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
              Fund
            </button>
          </div>
          <p className="text-2xl font-extrabold tracking-tight tabular-nums md:text-3xl">
            {hideAmount ? (
              <span className="text-lg tracking-[0.2em] md:text-xl">••••</span>
            ) : (
              formattedBalance
            )}
          </p>
        </div>
      </section>
      <FundWalletModal
        open={showFundModal}
        onClose={() => setShowFundModal(false)}
      />
    </div>
  );
}

export default memo(BalanceCard);
