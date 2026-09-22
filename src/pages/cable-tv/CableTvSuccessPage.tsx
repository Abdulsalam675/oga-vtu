import { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionSuccess from "../../components/layout/TransactionSuccess";
import { useTransactions } from "../../context/TransactionsContext";

interface LocationState {
  providerName?: string;
  smartCardNumber?: string;
  packageName?: string;
  packageValidity?: string;
  amount?: string;
}

function CableTvSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const { addTransaction } = useTransactions();

  const providerName = state.providerName || "Cable TV";
  const smartCardNumber = state.smartCardNumber || "";
  const packageName = state.packageName || "";
  const packageValidity = state.packageValidity || "";
  const amount = state.amount || "0";

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
        title: `${providerName} TV`,
        description: smartCardNumber,
        date: formattedTime,
        dateGroup: "Today",
        amount: -Number(amount),
        status: "success",
        category: "tv",
      },
      -Number(amount),
    );
  }, []);

  const details = [
    { label: "Transaction ID", value: transactionId },
    { label: "Smartcard No", value: smartCardNumber },
    { label: "Provider", value: providerName },
    { label: "Package", value: packageName },
    { label: "Duration", value: packageValidity },
    { label: "Service", value: "Cable TV" },
    {
      label: "Date & time",
      value: `${formattedDate} · ${formattedTime}`,
    },
  ];

  return (
    <TransactionSuccess
      title="Subscription successful"
      amount={amount}
      subtitle={`${providerName} · ${packageName}`}
      details={details}
      onDone={() => navigate("/dashboard", { replace: true })}
    />
  );
}

export default memo(CableTvSuccessPage);
