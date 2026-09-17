import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionSuccess from "../../components/layout/TransactionSuccess";

interface LocationState {
  phoneNumber?: string;
  networkName?: string;
  amount?: string;
  planName?: string;
  planValidity?: string;
}

function DataSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const phoneNumber = state.phoneNumber || "8012345678";
  const networkName = state.networkName || "MTN";
  const amount = state.amount || "1000";
  const planName = state.planName || "Data plan";
  const planValidity = state.planValidity || "";

  const [transactionId] = useState(
    () => `OGA${Date.now().toString().slice(-10)}`,
  );
  const [timestamp] = useState(() => new Date());

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

  const subtitle = planValidity
    ? `${networkName} · ${planName} · ${planValidity}`
    : `${networkName} · ${planName}`;

  const details = [
    { label: "Transaction ID", value: transactionId },
    { label: "Recipient", value: phoneNumber },
    { label: "Network", value: networkName },
    { label: "Plan", value: planName },
    ...(planValidity ? [{ label: "Validity", value: planValidity }] : []),
    { label: "Service", value: "Data" },
    {
      label: "Date & time",
      value: `${formattedDate} · ${formattedTime}`,
    },
  ];

  return (
    <TransactionSuccess
      title="Data purchased"
      amount={amount}
      subtitle={`${subtitle} · ${phoneNumber}`}
      details={details}
      onDone={() => navigate("/dashboard", { replace: true })}
    />
  );
}

export default memo(DataSuccessPage);
