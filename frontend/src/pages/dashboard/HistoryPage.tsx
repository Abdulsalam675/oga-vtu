import { memo, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import ClearButton from "../../components/buttons/ClearButton";
import TransactionCard from "../../components/transactions/TransactionCard";
import { useTransactions } from "../../context/TransactionsContext";
import TransactionsSkeleton from "../../components/TransactionsSkeleton";
import EmptyTransactions from "../../components/dashboard/EmptyTransactions";

function HistoryPage() {
  const { transactions, isLoading } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Filter transactions based on the search query
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;

    const query = searchQuery.toLowerCase().trim();
    return transactions.filter((tx) => {
      return (
        tx.title?.toLowerCase().includes(query) ||
        tx.description?.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        tx.transferDetails?.to?.toLowerCase().includes(query) ||
        tx.transferDetails?.from?.toLowerCase().includes(query)
      );
    });
  }, [transactions, searchQuery]);

  // 2. Group the filtered transactions by date
  const grouped = useMemo(() => {
    const map = new Map<string, typeof transactions>();
    filteredTransactions.forEach((tx) => {
      const list = map.get(tx.dateGroup) || [];
      list.push(tx);
      map.set(tx.dateGroup, list);
    });
    return Array.from(map.entries());
  }, [filteredTransactions]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] w-full max-w-3xl flex-col">
      {/* Header & Search Area */}
      <div className="sticky top-0 z-10 shrink-0 bg-gray-extra-light pb-5 pt-1 space-y-4">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-dark">
          Transactions
        </h1>

        {/* Search Bar Container */}
        <div className="flex items-center gap-1.5 rounded-full border border-transparent bg-gray-lighter/45 px-4 py-1 focus-within:border-primary">
          <Icon
            icon="solar:magnifer-linear"
            className="h-5 w-5 text-gray-normal shrink-0"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-2.5 px-2 text-sm font-medium placeholder-gray-light text-gray-semi-dark focus:outline-none"
          />
          {searchQuery && <ClearButton onClick={() => setSearchQuery("")} />}
        </div>
      </div>

      {/* Transactions List Content */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-none">
        {isLoading ? (
          <TransactionsSkeleton count={5} />
        ) : transactions.length === 0 ? (
          // Global empty state
          <EmptyTransactions variant="full" />
        ) : grouped.length === 0 ? (
          // Specific empty state if search returns no records
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-extra-light text-gray-normal">
              <Icon icon="solar:magnifer-zoom-out-linear" className="h-6 w-6" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-dark">
              No transactions found
            </p>
            <p className="mt-1 text-xs text-gray-light">
              Try checking your spelling or search another keyword.
            </p>
          </div>
        ) : (
          <div className="space-y-5 pb-4">
            {grouped.map(([group, items]) => (
              <section key={group}>
                <h2 className="mb-2 px-1 text-xs font-semibold text-gray-normal">
                  {group}
                </h2>
                <ul className="overflow-hidden rounded-2xl bg-white">
                  {items.map((tx, index) => (
                    <TransactionCard
                      key={tx.id}
                      transaction={tx}
                      isLast={index === items.length - 1}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(HistoryPage);
