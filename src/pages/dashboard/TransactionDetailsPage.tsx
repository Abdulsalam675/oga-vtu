import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import SubPageLayout from "../../components/layout/SubPageLayout";
import { demoTransactions } from "../../constants/transactions";
import type { TransactionCardData } from "../../components/transactions/TransactionCard";

const statusStyles = {
  success: {
    wrap: "bg-primary/10 text-primary",
    icon: "solar:check-circle-bold",
    label: "Successful",
  },
  pending: {
    wrap: "bg-amber-50 text-amber-600",
    icon: "solar:clock-circle-bold",
    label: "Pending",
  },
  failed: {
    wrap: "bg-error/10 text-error",
    icon: "solar:close-circle-bold",
    label: "Failed",
  },
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

function TransactionDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const transactionId = location.state?.transactionId as string | undefined;

  const transaction = demoTransactions.find(
    (item) => item.id === transactionId,
  ) as TransactionCardData | undefined;

  if (!transaction) {
    return (
      <SubPageLayout title="Receipt" titleSize="sm">
        <div className="flex flex-col items-center py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <Icon
              icon="solar:document-text-linear"
              className="h-7 w-7 text-gray-light"
            />
          </div>
          <p className="mt-4 text-sm font-semibold text-gray-dark">
            Transaction not found
          </p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-light">
            We couldn’t load this receipt. Go back and try again.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            Go back
          </button>
        </div>
      </SubPageLayout>
    );
  }

  const tx = transaction;
  const isCredit = tx.amount > 0;
  const status = statusStyles[tx.status];

  const rows = [
    { label: "Type", value: tx.category },
    {
      label: "Description",
      value: tx.description || tx.title,
    },
    { label: "Date & time", value: tx.date },
    { label: "Reference", value: tx.id },
  ];

  return (
    <SubPageLayout title="Receipt" titleSize="sm">
      <div className="space-y-5">
        <div className="flex flex-col items-center py-4 text-center bg-white rounded-2xl">
          <div
            className={
              "flex h-14 w-14 items-center justify-center rounded-full " +
              status.wrap
            }
          >
            <Icon icon={status.icon} className="h-7 w-7" />
          </div>

          <p className="mt-4 text-sm font-medium text-gray-semi-dark">
            {tx.title}
          </p>

          <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-dark">
            {isCredit ? "+" : "-"}
            {formatCurrency(tx.amount)}
          </h2>

          <span
            className={
              "mt-3 rounded-full px-3 py-1 text-xs font-semibold " + status.wrap
            }
          >
            {status.label}
          </span>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="mb-4 text-xs font-semibold text-gray-light">
            Transaction details
          </p>

          <div className="space-y-3.5">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4"
              >
                <span className="text-sm text-gray-light">{row.label}</span>
                <span className="max-w-[60%] text-right text-sm font-semibold capitalize text-gray-dark">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary/15 py-3.5 text-sm font-semibold text-primary active:bg-primary/25"
          >
            Report Issue
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white active:opacity-90"
          >
            <Icon icon="solar:share-linear" className="h-4 w-4" />
            Share Receipt
          </button>
        </div>
      </div>
    </SubPageLayout>
  );
}

export default memo(TransactionDetailsPage);
