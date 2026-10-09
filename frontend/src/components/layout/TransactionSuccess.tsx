import { memo } from "react";
import { Icon } from "@iconify/react";
import Button from "../buttons/Button";

export type SuccessDetail = {
  label: string;
  value: string;
};

interface TransactionSuccessProps {
  title: string;
  amount: string | number;
  subtitle: string;
  details: SuccessDetail[];
  onDone: () => void;
}

function formatAmount(amount: string | number) {
  return Number(amount).toLocaleString("en-NG");
}

function TransactionSuccess({
  title,
  amount,
  subtitle,
  details,
  onDone,
}: TransactionSuccessProps) {
  const formattedAmount = formatAmount(amount);

  return (
    <div className="flex w-full flex-col bg-gray-extra-light">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between px-4 py-5">
        <div>
          {/* Hero */}
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-18 w-18 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/11" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Icon
                  icon="solar:check-read-bold"
                  className="h-6 w-6 text-white"
                />
              </div>
            </div>

            <p className="mt-3 text-sm font-semibold text-primary">{title}</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-dark">
              ₦{formattedAmount}
            </h1>
            <p className="mt-1 text-sm text-gray-light">{subtitle}</p>
          </div>

          {/* Receipt */}
          <div className="mt-5 rounded-2xl bg-white p-4">
            <div className="space-y-4">
              {details.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-3"
                >
                  <span className="text-xs text-gray-light">{row.label}</span>
                  <span className="max-w-[60%] text-right text-xs font-semibold text-gray-dark">
                    {row.value}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 border-t border-gray-lightest pt-3">
                <span className="text-xs font-semibold text-gray-dark">
                  Amount paid
                </span>
                <span className="text-sm font-extrabold text-primary">
                  ₦{formattedAmount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <Button label="Done" htmlType="button" onClick={onDone} />

          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-3.5 text-sm font-semibold text-gray-dark active:bg-gray-lightest"
          >
            <Icon icon="solar:share-linear" className="h-5 w-5" />
            Share receipt
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(TransactionSuccess);
