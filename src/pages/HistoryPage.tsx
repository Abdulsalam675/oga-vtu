// src/pages/HistoryPage.tsx
import { memo, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

type TransactionStatus = "success" | "pending" | "failed";
type TransactionCategory = "airtime" | "data" | "bills" | "wallet";

interface Transaction {
  id: string;
  title: string;
  description: string;
  date: string;
  dateGroup: string;
  amount: number;
  status: TransactionStatus;
  category: TransactionCategory;
}

const demoTransactions: Transaction[] = [
  {
    id: "1",
    title: "MTN Airtime",
    description: "0803 123 4567",
    date: "10:24 AM",
    dateGroup: "Today",
    amount: -500,
    status: "success",
    category: "airtime",
  },
  {
    id: "2",
    title: "Wallet Top-up",
    description: "Bank transfer (GTBank)",
    date: "9:05 AM",
    dateGroup: "Today",
    amount: 50000,
    status: "success",
    category: "wallet",
  },
  {
    id: "3",
    title: "Airtel Data",
    description: "0812 987 6543",
    date: "4:12 PM",
    dateGroup: "Yesterday",
    amount: -1200,
    status: "success",
    category: "data",
  },
  {
    id: "4",
    title: "IKEDC Electricity",
    description: "Meter 45012345678",
    date: "6:40 PM",
    dateGroup: "Yesterday",
    amount: -8500,
    status: "pending",
    category: "bills",
  },
  {
    id: "5",
    title: "DSTV Compact",
    description: "Decoder 7031234567",
    date: "2:15 PM",
    dateGroup: "This week",
    amount: -8700,
    status: "failed",
    category: "bills",
  },
  {
    id: "6",
    title: "Glo Airtime",
    description: "0805 555 1212",
    date: "11:30 AM",
    dateGroup: "This week",
    amount: -200,
    status: "success",
    category: "airtime",
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

function HistoryPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    function () {
      const q = search.trim().toLowerCase();
      if (!q) return demoTransactions;

      return demoTransactions.filter(function (tx) {
        return (
          tx.title.toLowerCase().includes(q) ||
          tx.description.toLowerCase().includes(q)
        );
      });
    },
    [search],
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

  function handleFilterClick() {
    // later: open filter bottom sheet
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-dark">
          Transactions
        </h1>
        <button
          type="button"
          onClick={handleFilterClick}
          className="cursor-pointer text-sm font-semibold text-primary"
        >
          Filter
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
        <Icon
          icon="solar:magnifer-linear"
          className="h-5 w-5 shrink-0 text-gray-light"
        />
        <input
          type="search"
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
          placeholder="Search transactions"
          className="w-full bg-transparent text-sm text-gray-dark outline-none placeholder:text-gray-light py-2 px-1"
        />
      </div>

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
          <p className="mt-1 text-xs text-gray-light">Try a different search</p>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map(function ([group, items]) {
            return (
              <section key={group}>
                <h2 className="mb-2 px-1 text-xs font-semibold text-gray-normal">
                  {group}
                </h2>

                <ul className="overflow-hidden rounded-2xl bg-white">
                  {items.map(function (tx, index) {
                    const isCredit = tx.amount > 0;
                    const isLast = index === items.length - 1;

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
                                    "font-medium capitalize " +
                                    statusStyles[tx.status]
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
                                (isCredit
                                  ? "text-emerald-600"
                                  : "text-gray-semi-dark")
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
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(HistoryPage);
