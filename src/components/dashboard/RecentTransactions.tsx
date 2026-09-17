import { memo } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import TransactionCard, { type TransactionCardData } from "../transactions/TransactionCard";
import { demoTransactions } from "../../constants/transactions";

interface RecentTransactionsProps {
  transactions?: TransactionCardData[];
  hideAmount?: boolean;
}

function RecentTransactions({
  transactions = demoTransactions,
  hideAmount = false,
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
          <Icon
            icon="solar:history-linear"
            className="mx-auto mb-3 h-12 w-12 text-gray-light"
          />
          <p className="text-sm font-semibold text-gray-dark">
            No transactions yet
          </p>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-2xl bg-white">
          {transactions.map(function (transaction, index) {
            return (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                isLast={index === transactions.length - 1}
                hideAmount={hideAmount}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default memo(RecentTransactions);
