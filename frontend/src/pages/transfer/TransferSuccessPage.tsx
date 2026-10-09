import { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionSuccess from "../../components/layout/TransactionSuccess";
import { useTransactions } from "../../context/TransactionsContext";

interface LocationState {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  amount?: string;
  narration?: string;
}

function TransferSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const { addTransaction } = useTransactions();

  const bankName = state.bankName || "";
  const accountNumber = state.accountNumber || "";
  const accountName = state.accountName || "Beneficiary";
  const amount = state.amount || "0";
  const narration = state.narration || "";

  const [transactionId] = useState(
    () => `OGA${Date.now().toString().slice(-10)}`,
  );
  const [timestamp] = useState(() => new Date());
  const hasSaved = useRef(false);

  const formattedDate = timestamp.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = timestamp.toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    addTransaction(
      {
        id: transactionId,
        title: `Transfer to ${accountName}`,
        description: accountNumber,
        date: formattedTime,
        dateGroup: "Today",
        amount: -Number(amount),
        status: "success",
        category: "transfer",
        transferDetails: {
          from: "OGA Wallet",
          to: accountName,
          accountNumber,
          bankName,
          narration,
        },
      },
      -Number(amount),
    );
  }, []);

  const details = [
    { label: "Transaction ID", value: transactionId },
    { label: "To", value: accountName },
    { label: "Account No", value: accountNumber },
    { label: "Bank", value: bankName },
    { label: "Narration", value: narration || "—" },
    { label: "Service", value: "Transfer" },
    {
      label: "Date & time",
      value: `${formattedDate} · ${formattedTime}`,
    },
  ];

  return (
    <TransactionSuccess
      title="Transfer successful"
      amount={amount}
      subtitle={`${accountName} · ${bankName}`}
      details={details}
      onDone={() => navigate("/dashboard", { replace: true })}
    />
  );
}

export default memo(TransferSuccessPage);
