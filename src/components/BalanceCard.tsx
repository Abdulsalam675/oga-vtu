// src/components/dashboard/BalanceCard.tsx
import { memo, useState } from "react";
import { Icon } from "@iconify/react";

interface BalanceCardProps {
  balance?: number;
  onFundClick?: () => void;
}

function BalanceCard({ balance = 0, onFundClick }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(balance);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white md:p-6">
      {/* Decorative shapes */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/11" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/7" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white/83">Wallet balance</p>
            <button
              type="button"
              onClick={function () {
                setIsVisible(function (prev) {
                  return !prev;
                });
              }}
              aria-label={isVisible ? "Hide balance" : "Show balance"}
              className="cursor-pointer transition-opacity hover:opacity-82"
            >
              <Icon
                icon={isVisible ? "mdi:eye-off" : "solar:eye-bold"}
                className="h-5 w-5 text-white/76"
              />
            </button>
          </div>

          <button
            type="button"
            onClick={onFundClick}
            className="flex shrink-0 items-center gap-1.5 rounded-full cursor-pointer bg-white px-4 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
          >
            <Icon icon="solar:add-circle-linear" className="h-4 w-4" />
            Fund
          </button>
        </div>

        <p className="text-2xl font-extrabold tracking-tight tabular-nums md:text-3xl">
          {isVisible ? formattedBalance : "****"}
        </p>
      </div>
    </section>
  );
}

export default memo(BalanceCard);
