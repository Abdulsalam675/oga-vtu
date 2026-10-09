import { memo } from "react";
import SubPageLayout from "./SubPageLayout";
import Button from "../buttons/Button";
import PinKeypadModal from "../modals/PinKeypadModal";
import { useTransactions } from "../../context/TransactionsContext";
export type ConfirmDetail = {
  label: string;
  value: string;
};

interface TransactionConfirmProps {
  networkLogo?: string;
  networkName?: string;
  amount: string | number;
  subtitle: string;
  details: ConfirmDetail[];
  payLabel?: string;
  isLoading?: boolean;
  onPay: () => void;
  showPinModal: boolean;
  onClosePin: () => void;
  onPinComplete: () => void;
}

function formatAmount(amount: string | number) {
  return Number(amount).toLocaleString("en-NG");
}

function TransactionConfirm({
  networkLogo,
  networkName,
  amount,
  subtitle,
  details,
  payLabel,
  isLoading = false,
  onPay,
  showPinModal,
  onClosePin,
  onPinComplete,
}: TransactionConfirmProps) {
  const { balance: availableBalance } = useTransactions();
  const formattedAmount = formatAmount(amount);
  const buttonLabel = payLabel || `Pay ₦${formattedAmount}`;
  const hasInsufficientBalance = Number(amount) > availableBalance;

  return (
    <SubPageLayout title="Confirm payment" titleSize="sm">
      <div className="flex min-h-[70dvh] flex-col justify-between">
        <div className="space-y-5">
          <div className="rounded-2xl bg-white px-4 py-6 text-center">
            {networkLogo && (
              <div className="mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-extra-light">
                <img
                  src={networkLogo}
                  alt={networkName || "Network"}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <p className="mt-4 text-xs font-semibold text-gray-light">
              You are paying
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-dark">
              ₦{formattedAmount}
            </h1>
            <p className="mt-1 text-sm text-gray-semi-dark">{subtitle}</p>
          </div>

          <div className="rounded-2xl bg-white p-4">
            <div className="space-y-3.5">
              {details.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-gray-light">{row.label}</span>
                  <span className="text-right text-sm font-semibold text-gray-dark">
                    {row.value}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between gap-3 border-t border-gray-lightest pt-3.5">
                <span className="text-sm font-semibold text-gray-dark">
                  Total
                </span>
                <span className="text-base font-extrabold text-gray-dark">
                  ₦{formattedAmount}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-gray-dark">
                  Available balance
                </span>
                <span className="text-right text-sm font-semibold text-gray-dark">
                  ₦{formatAmount(availableBalance)}
                </span>
              </div>

              {hasInsufficientBalance && (
                <p className="text-xs font-medium text-error">
                  Insufficient balance for this payment
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button
            label={buttonLabel}
            htmlType="button"
            loading={isLoading}
            disabled={hasInsufficientBalance}
            onClick={() => {
              if (!hasInsufficientBalance) onPay();
            }}
          />
        </div>
      </div>

      <PinKeypadModal
        open={showPinModal}
        onClose={onClosePin}
        isLoading={isLoading}
        onComplete={onPinComplete}
      />
    </SubPageLayout>
  );
}

export default memo(TransactionConfirm);
