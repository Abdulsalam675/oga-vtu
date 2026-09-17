import { memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { serviceIcons } from "../../constants/serviceIcons";

export type TransactionStatus = "success" | "pending" | "failed";

export type TransactionCategory =
  | "airtime"
  | "data"
  | "electricity"
  | "tv"
  | "bills"
  | "transfer"
  | "wallet";

export interface TransactionCardData {
  id: string;
  title: string;
  description: string;
  date: string;
  dateGroup: string;
  amount: number;
  status: TransactionStatus;
  category: TransactionCategory;
}

interface TransactionCardProps {
  transaction: TransactionCardData;
  isLast?: boolean;
  hideAmount?: boolean;
}

const categoryIcons: Record<TransactionCategory, string> = {
  airtime: serviceIcons.airtime,
  data: serviceIcons.data,
  electricity: serviceIcons.electricity,
  tv: serviceIcons.tv,
  bills: serviceIcons.electricity,
  transfer: serviceIcons.transfer,
  wallet: serviceIcons.wallet,
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
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));

  return amount >= 0 ? `+${value}` : `-${value}`;
}

function TransactionCard({
  transaction,
  isLast = false,
  hideAmount = false,
}: TransactionCardProps) {
  const navigate = useNavigate();

  function handleTransactionClick() {
    navigate("/dashboard/transaction-details", {
      state: { transactionId: transaction.id },
    });
  }

  const isCredit = transaction.amount > 0;

  const icon =
    isCredit || transaction.category === "transfer"
      ? isCredit
        ? "solar:arrow-left-down-linear"
        : "solar:arrow-right-up-linear"
      : categoryIcons[transaction.category];

  return (
    <li>
      <button
        type="button"
        onClick={handleTransactionClick}
        className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-extra-light ${
          !isLast ? "border-b border-gray-lightest" : ""
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon icon={icon} className="h-5 w-5 text-gray-semi-dark" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-gray-dark">
            {transaction.title}
          </p>

          <p className="mt-0.5 truncate text-[11px] font-medium text-gray-light">
            {transaction.date}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p
            className={`text-[13px] font-semibold ${
              isCredit ? "text-primary" : "text-error"
            }`}
          >
            {hideAmount ? "••••" : formatAmount(transaction.amount)}
          </p>

          <p
            className={`mt-0.5 text-[11px] font-medium capitalize ${statusStyles[transaction.status]}`}
          >
            {transaction.status === "success"
              ? "Successful"
              : transaction.status}
          </p>
        </div>
      </button>
    </li>
  );
}

export default memo(TransactionCard);
