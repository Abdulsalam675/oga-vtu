// src/components/dashboard/RecentTransactions.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

type TransactionStatus = "success" | "pending" | "failed";
type TransactionCategory = "airtime" | "data" | "bills" | "wallet";

interface Transaction {
  id: string;
  title: string;
  description: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  category: TransactionCategory;
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
}

const demoTransactions: Transaction[] = [
  {
    id: "1",
    title: "MTN Airtime",
    description: "0803 123 4567",
    date: "10:24 AM",
    amount: -500,
    status: "success",
    category: "airtime",
  },
  {
    id: "2",
    title: "IKEDC Electricity",
    description: "Meter 45012345678",
    date: "6:40 PM",
    amount: -8500,
    status: "pending",
    category: "bills",
  },
  {
    id: "3",
    title: "Wallet Top-up",
    description: "Bank transfer (GTBank)",
    date: "9:05 AM",
    amount: 50000,
    status: "success",
    category: "wallet",
  },
  {
    id: "4",
    title: "Airtel Data",
    description: "0812 987 6543",
    date: "4:12 PM",
    amount: -1200,
    status: "success",
    category: "data",
  },
  {
    id: "5",
    title: "DSTV Compact",
    description: "Decoder 7031234567",
    date: "2:15 PM",
    amount: -8700,
    status: "failed",
    category: "bills",
  },
];

const categoryIcons: Record<TransactionCategory, string> = {
  airtime: "solar:phone-linear",
  data: "solar:smartphone-linear",
  bills: "solar:lightbulb-bolt-linear",
  wallet: "solar:wallet-money-linear",
};

const statusStyles: Record<TransactionStatus, string> = {
  success: "text-emerald-600",
  pending: "text-amber-500",
  failed: "text-error",
};

function formatAmount(amount: number) {
  const value = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));

  return amount >= 0 ? `+${value}` : `-${value}`;
}

function RecentTransactions({
  transactions = demoTransactions,
}: RecentTransactionsProps) {
  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-gray-dark">
          Recent transactions
        </h2>
        <Link
          to="/dashboard/history"
          className="text-xs font-semibold text-primary transition-opacity hover:opacity-80"
        >
          View all
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
        <ul className="overflow-hidden rounded-2xl bg-white">
          {transactions.map(function (tx, index) {
            const isCredit = tx.amount > 0;
            const isLast = index === transactions.length - 1;

            return (
              <li key={tx.id}>
                <button
                  type="button"
                  className={
                    "flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-extra-light " +
                    (!isLast ? "border-b border-gray-lightest" : "")
                  }
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon
                      icon={categoryIcons[tx.category]}
                      className="h-5 w-5 text-primary"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-semi-dark">
                      {tx.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-light">
                      {tx.description}
                      {tx.status !== "success" && (
                        <span
                          className={
                            "font-medium capitalize " + statusStyles[tx.status]
                          }
                        >
                          {" · "}
                          {tx.status}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={
                        "text-sm font-medium " +
                        (isCredit ? "text-emerald-600" : "text-gray-semi-dark")
                      }
                    >
                      {formatAmount(tx.amount)}
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-light">
                      {tx.date}
                    </p>
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
