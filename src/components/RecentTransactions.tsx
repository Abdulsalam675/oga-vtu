// src/components/dashboard/RecentTransactions.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type TransactionStatus = "success" | "pending" | "failed";

interface Transaction {
  id: string;
  title: string;
  description: string;
  date: string;
  amount: number; // Positive for credits (funding), Negative for debits (purchases)
  status: TransactionStatus;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

const demoTransactions: Transaction[] = [
  {
    id: "1",
    title: "MTN Airtime",
    description: "0803 123 4567",
    date: "03 Sep, 10:24 AM",
    amount: -500,
    status: "success",
  },
  {
    id: "2",
    title: "IKEDC Electricity",
    description: "Meter 45012345678",
    date: "02 Sep, 6:40 PM",
    amount: -8500,
    status: "pending",
  },
  {
    id: "3",
    title: "Transfer to Chinedu",
    description: "Kuda Bank - 2019847362",
    date: "02 Sep, 11:50 AM",
    amount: -15000,
    status: "failed",
  },
  {
    id: "4",
    title: "Wallet Top-up",
    description: "Bank transfer (GTBank)",
    date: "01 Sep, 9:05 AM",
    amount: 50000,
    status: "success",
  },
  {
    id: "5",
    title: "Airtel Data",
    description: "0812 987 6543",
    date: "31 Aug, 4:12 PM",
    amount: -1200,
    status: "success",
  },
];

const statusStyles: Record<TransactionStatus, string> = {
  success: "text-emerald-600", // Fixed to use semantic green rather than "text-primary" if primary is blue/purple
  pending: "text-amber-500",
  failed: "text-red-500", // Fallback if your custom "text-error" config has issues
};

function formatAmount(amount: number) {
  const absoluteValue = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));

  return amount >= 0 ? `+${absoluteValue}` : `-${absoluteValue}`;
}

function RecentTransactions({
  transactions = demoTransactions,
}: RecentTransactionsProps) {
  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-medium text-gray-dark sm:text-sm">
          Recent transactions
        </h2>
        <Link
          to="/dashboard/history"
          className="text-xs font-semibold text-primary transition-opacity hover:opacity-80 sm:text-sm"
        >
          view all
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="rounded-2xl bg-white px-4 py-10 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-extra-light">
            <Icon
              icon="solar:history-linear"
              className="h-6 w-6 text-gray-light"
            />
          </div>
          <p className="text-sm font-semibold text-gray-dark">
            No transactions yet
          </p>
          <p className="mt-1 text-xs text-gray-light">
            Your airtime, data, and bill payments will show here
          </p>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-xl bg-white">
          {transactions.map(function (tx, index) {
            const isCredit = tx.amount > 0;
            const isLast = index === transactions.length - 1;

            return (
              <li key={tx.id}>
                <button
                  type="button"
                  className={`flex w-full cursor-pointer items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-gray-extra-light/50 active:bg-gray-extra-light sm:gap-4 sm:p-4 ${
                    !isLast ? "border-b border-gray-lightest" : ""
                  }`}
                >
                  {/* Icon Container */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${
                      isCredit
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon
                      icon={
                        isCredit
                          ? "solar:arrow-down-linear"
                          : "solar:arrow-up-linear"
                      }
                      className="h-4 w-4"
                    />
                  </div>

                  {/* Primary Details (Left-aligned) */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-semi-dark sm:text-sm">
                      {tx.title}
                    </p>
                    {tx.description && (
                      <p className="mt-0.5 truncate text-[11px] text-gray-normal sm:text-xs">
                        {tx.description}
                      </p>
                    )}
                  </div>

                  {/* Financial & Status Info (Right-aligned) */}
                  <div className="shrink-0 text-right">
                    <p
                      className={`text-xs font-semibold sm:text-sm ${
                        isCredit ? "text-emerald-600" : "text-gray-semi-dark"
                      }`}
                    >
                      {formatAmount(tx.amount)}
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1.5 text-[11px] sm:text-xs">
                      <span className="text-gray-normal">{tx.date}</span>
                      <span
                        className={`font-semibold capitalize ${statusStyles[tx.status]}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default memo(RecentTransactions);
