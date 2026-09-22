import { memo, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionSuccess from "../../components/layout/TransactionSuccess";
import { useTransactions } from "../../context/TransactionsContext";

interface LocationState {
  phoneNumber?: string;
  networkName?: string;
  amount?: string;
}

function AirtimeSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const { addTransaction } = useTransactions();

  const phoneNumber = state.phoneNumber || "8012345678";
  const networkName = state.networkName || "MTN";
  const amount = state.amount || "1000";

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
        title: `${networkName} Airtime`,
        description: phoneNumber,
        date: formattedTime,
        dateGroup: "Today",
        amount: -Number(amount),
        status: "success",
        category: "airtime",
      },
      -Number(amount),
    );
  }, []);

  const details = [
    { label: "Transaction ID", value: transactionId },
    { label: "Recipient", value: phoneNumber },
    { label: "Network", value: networkName },
    { label: "Service", value: "Airtime" },
    { label: "Date & time", value: `${formattedDate} · ${formattedTime}` },
  ];

  return (
    <TransactionSuccess
      title="Airtime purchased"
      amount={amount}
      subtitle={`${networkName} · ${phoneNumber}`}
      details={details}
      onDone={() => navigate("/dashboard", { replace: true })}
    />
  );
}

export default memo(AirtimeSuccessPage);
