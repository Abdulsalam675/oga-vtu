import { memo, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import TransactionCard, {
  type TransactionCardData,
} from "../../components/transactions/TransactionCard";
import { demoTransactions } from "../../constants/transactions";

type Transaction = TransactionCardData & {
  dateGroup: string;
};

function HistoryPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return demoTransactions;

    return demoTransactions.filter((tx) => {
      return (
        tx.title.toLowerCase().includes(q) ||
        tx.description.toLowerCase().includes(q)
      );
    });
  }, [search]);

  const grouped = useMemo(() => {
    const map = new Map<string, Transaction[]>();

    filtered.forEach((tx) => {
      const list = map.get(tx.dateGroup) || [];
      list.push(tx);
      map.set(tx.dateGroup, list);
    });

    return Array.from(map.entries());
  }, [filtered]);

  function handleFilterClick() {}

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] w-full max-w-3xl flex-col">
      <div className="shrink-0 space-y-4 pb-5">
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
          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search transactions"
            className="w-full bg-transparent px-1 py-2 text-sm text-gray-dark outline-none placeholder:text-gray-light"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-none">
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
              Try a different search
            </p>
          </div>
        ) : (
          <div className="space-y-5 pb-4">
            {grouped.map(([group, items]) => {
              return (
                <section key={group}>
                  <h2 className="mb-2 px-1 text-xs font-semibold text-gray-normal">
                    {group}
                  </h2>

                  <ul className="overflow-hidden rounded-2xl bg-white">
                    {items.map((tx, index) => {
                      return (
                        <TransactionCard
                          key={tx.id}
                          transaction={tx}
                          isLast={index === items.length - 1}
                        />
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(HistoryPage);
