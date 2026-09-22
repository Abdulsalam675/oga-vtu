import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import Button from "../../components/buttons/Button";
import AmountFields from "../../components/inputs/AmountFields.tsx";
import { useTransactions } from "../../context/TransactionsContext";

interface LocationState {
  bankId?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

const predefinedAmounts = [500, 1000, 2000, 5000, 10000, 20000];
const MIN_AMOUNT = 100;

function TransferAmountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const { balance } = useTransactions();

  const bankName = state.bankName || "";
  const accountNumber = state.accountNumber || "";
  const accountName = state.accountName || "";

  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");

  const amountNumber = Number(amount) || 0;
  const canContinue = amountNumber >= MIN_AMOUNT && amountNumber <= balance;

  function handleContinue() {
    if (!canContinue) return;

    navigate("/dashboard/transfer/confirm", {
      state: {
        bankName,
        accountNumber,
        accountName,
        amount,
        narration: narration.trim(),
        availableBalance: balance,
      },
    });
  }

  return (
    <SubPageLayout title="Amount" titleSize="sm">
      <div className="space-y-6">
        <div className="rounded-2xl bg-primary/10 px-4 py-3">
          <p className="text-xs text-gray-semi-dark">Available balance</p>
          <p className="mt-0.5 text-lg font-extrabold text-primary">
            ₦{balance.toLocaleString("en-NG", { minimumFractionDigits: 0 })}
          </p>
        </div>

        <AmountFields
          amount={amount}
          onAmountChange={setAmount}
          presetAmounts={predefinedAmounts}
          onPresetClick={(value: number) => setAmount(String(value))}
          error={
            amountNumber > balance
              ? "Amount exceeds available balance"
              : undefined
          }
        />

        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-dark">
            Narration{" "}
            <span className="font-normal text-gray-light">(optional)</span>
          </label>
          <div className="rounded-2xl bg-white px-2.5 py-3">
            {/* Narration */}
            <textarea
              placeholder="What's this for?"
              value={narration}
              maxLength={100}
              rows={3}
              autoComplete="off"
              onChange={(e) => setNarration(e.target.value)}
              className="w-full resize-none rounded-2xl bg-gray-extra-light px-4 py-3 text-sm font-medium text-gray-dark outline-none placeholder:text-gray-light"
            />
          </div>
        </div>

        <Button
          label="Continue"
          htmlType="button"
          disabled={!canContinue}
          onClick={handleContinue}
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(TransferAmountPage);
