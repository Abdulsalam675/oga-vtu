import { memo } from "react";
import { Link } from "react-router-dom";
import TransactionCard from "../transactions/TransactionCard";
import { useTransactions } from "../../context/TransactionsContext";
import TransactionsSkeleton from "../TransactionsSkeleton";
import EmptyTransactions from "./EmptyTransactions";

interface RecentTransactionsProps {
  hideAmount?: boolean;
}

function RecentTransactions({ hideAmount = false }: RecentTransactionsProps) {
  const { transactions, isLoading } = useTransactions();
  const recent = transactions.slice(0, 5);

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

      {isLoading ? (
        <TransactionsSkeleton count={3} />
      ) : recent.length === 0 ? (
        <EmptyTransactions />
      ) : (
        <ul className="overflow-hidden rounded-2xl bg-white">
          {recent.map((transaction, index) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              isLast={index === recent.length - 1}
              hideAmount={hideAmount}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default memo(RecentTransactions);
