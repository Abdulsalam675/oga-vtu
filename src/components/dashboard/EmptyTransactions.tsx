import { memo } from "react";
import { Icon } from "@iconify/react";

interface EmptyTransactionsProps {
  variant?: "compact" | "full";
  showCta?: boolean;
}

function EmptyTransactions({ variant = "compact" }: EmptyTransactionsProps) {
  const isFull = variant === "full";

  return (
    <div
      className={
        "flex flex-col items-center text-center " +
        (isFull
          ? "h-full justify-center px-6"
          : "justify-center rounded-2xl bg-white px-6 py-15")
      }
    >
      <div
        className={
          "flex items-center justify-center rounded-full bg-primary/10 " +
          (isFull ? "h-16 w-16" : "h-12 w-12")
        }
      >
        <Icon
          icon="solar:history-linear"
          className={isFull ? "h-8 w-8 text-primary" : "h-6 w-6 text-primary"}
        />
      </div>

      <p
        className={
          "font-bold text-gray-dark " +
          (isFull ? "mt-5 text-base" : "mt-3 text-sm")
        }
      >
        No transactions yet
      </p>
    </div>
  );
}

export default memo(EmptyTransactions);
