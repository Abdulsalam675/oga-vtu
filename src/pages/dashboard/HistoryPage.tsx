import { memo, useMemo } from "react";
import TransactionCard from "../../components/transactions/TransactionCard";
import { useTransactions } from "../../context/TransactionsContext";
import TransactionsSkeleton from "../../components/TransactionsSkeleton";
import EmptyTransactions from "../../components/dashboard/EmptyTransactions";

function HistoryPage() {
  const { transactions, isLoading } = useTransactions();

  const grouped = useMemo(() => {
    const map = new Map<string, typeof transactions>();
    transactions.forEach((tx) => {
      const list = map.get(tx.dateGroup) || [];
      list.push(tx);
      map.set(tx.dateGroup, list);
    });
    return Array.from(map.entries());
  }, [transactions]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] w-full max-w-3xl flex-col">
      <div className="shrink-0 pb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-dark">
          Transactions
        </h1>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scrollbar-none">
        {isLoading ? (
          <TransactionsSkeleton count={5} />
        ) : grouped.length === 0 ? (
          <EmptyTransactions variant="full" />
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
