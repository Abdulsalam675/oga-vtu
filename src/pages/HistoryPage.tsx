// src/pages/dashboard/HistoryPage.tsx
import { memo, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

type TransactionStatus = "success" | "pending" | "failed";
type TransactionFilter = "all" | "credit" | "debit";

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  status: TransactionStatus;
  icon: string;
  dateGroup: string;
}

const demoTransactions: Transaction[] = [
  {
    id: "1",
    title: "MTN Airtime",
    subtitle: "Today, 10:24 AM",
    amount: -500,
    status: "success",
    icon: "solar:phone-bold",
    dateGroup: "Today",
  },
  {
    id: "2",
    title: "Wallet Top-up",
    subtitle: "Today, 9:05 AM",
    amount: 5000,
    status: "success",
    icon: "solar:arrow-down-bold",
    dateGroup: "Today",
  },
  {
    id: "3",
    title: "Airtel Data",
    subtitle: "Yesterday, 4:12 PM",
    amount: -1200,
    status: "success",
    icon: "solar:wifi-router-bold",
    dateGroup: "Yesterday",
  },
  {
    id: "4",
    title: "IKEDC Electricity",
    subtitle: "Yesterday, 6:40 PM",
    amount: -3500,
    status: "pending",
    icon: "solar:lightbulb-bolt-bold",
    dateGroup: "Yesterday",
  },
  {
    id: "5",
    title: "DSTV Subscription",
    subtitle: "Sun, 2:15 PM",
    amount: -8700,
    status: "failed",
    icon: "solar:tv-bold",
    dateGroup: "This week",
  },
  {
    id: "6",
    title: "Glo Airtime",
    subtitle: "Sat, 11:30 AM",
    amount: -200,
    status: "success",
    icon: "solar:phone-bold",
    dateGroup: "This week",
  },
];

const filters: { id: TransactionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "credit", label: "Money in" },
  { id: "debit", label: "Money out" },
];

function formatAmount(amount: number) {
  const value = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(Math.abs(amount));

  return amount >= 0 ? `+${value}` : `-${value}`;
}

function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>("all");

  const filtered = useMemo(
    function () {
      if (activeFilter === "credit") {
        return demoTransactions.filter(function (tx) {
          return tx.amount > 0;
        });
      }
      if (activeFilter === "debit") {
        return demoTransactions.filter(function (tx) {
          return tx.amount < 0;
        });
      }
      return demoTransactions;
    },
    [activeFilter],
  );

  const grouped = useMemo(
    function () {
      const map = new Map<string, Transaction[]>();

      filtered.forEach(function (tx) {
        const list = map.get(tx.dateGroup) || [];
        list.push(tx);
        map.set(tx.dateGroup, list);
      });

      return Array.from(map.entries());
    },
    [filtered],
  );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-gray-dark md:text-2xl">
          Transaction history
        </h1>
        <p className="mt-1 text-sm text-gray-light">
          Track your airtime, data, bills, and wallet activity
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(function (filter) {
          const isActive = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={function () {
                setActiveFilter(filter.id);
              }}
              className={
                "shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
                (isActive
                  ? "bg-primary text-white"
                  : "bg-white text-gray-semi-dark")
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      {grouped.length === 0 ? (
        <div className="rounded-2xl bg-white px-4 py-14 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-extra-light">
            <Icon
              icon="solar:history-linear"
              className="h-6 w-6 text-gray-light"
            />
          </div>
          <p className="text-sm font-semibold text-gray-dark">
            No transactions found
          </p>
          <p className="mt-1 text-xs text-gray-light">
            Try another filter or make a payment
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map(function ([group, items]) {
            return (
              <section key={group}>
                <h2 className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-gray-light">
                  {group}
                </h2>

                <div className="overflow-hidden rounded-2xl bg-white">
                  <ul className="divide-y divide-gray-extra-light">
                    {items.map(function (tx) {
                      const isCredit = tx.amount > 0;

                      return (
                        <li key={tx.id}>
                          <button
                            type="button"
                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-extra-light"
                          >
                            <div
                              className={
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full " +
                                (isCredit
                                  ? "bg-primary/10"
                                  : "bg-gray-extra-light")
                              }
                            >
                              <Icon
                                icon={tx.icon}
                                className={
                                  "h-5 w-5 " +
                                  (isCredit
                                    ? "text-primary"
                                    : "text-gray-semi-dark")
                                }
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-gray-dark">
                                {tx.title}
                              </p>
                              <p className="mt-0.5 truncate text-xs text-gray-light">
                                {tx.subtitle}
                                {tx.status === "pending" ? " · Pending" : ""}
                                {tx.status === "failed" ? " · Failed" : ""}
                              </p>
                            </div>

                            <p
                              className={
                                "shrink-0 text-sm font-bold " +
                                (isCredit ? "text-primary" : "text-gray-dark")
                              }
                            >
                              {formatAmount(tx.amount)}
                            </p>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(HistoryPage);
