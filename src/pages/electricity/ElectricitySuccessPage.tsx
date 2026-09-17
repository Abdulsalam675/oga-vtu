import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionSuccess from "../../components/layout/TransactionSuccess";

interface LocationState {
  discoName?: string;
  discoShortName?: string;
  meterType?: "prepaid" | "postpaid";
  meterNumber?: string;
  amount?: string;
}

function ElectricitySuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const discoName = state.discoName || "Electricity";
  const discoShortName = state.discoShortName || "";
  const meterType = state.meterType || "prepaid";
  const meterNumber = state.meterNumber || "";
  const amount = state.amount || "0";
  const typeLabel = meterType === "prepaid" ? "Prepaid" : "Postpaid";
  const distributor = discoShortName || discoName;
  const [token] = useState(() =>
    meterType === "prepaid"
      ? Array.from({ length: 20 }, () => Math.floor(Math.random() * 10))
          .join("")
          .replace(/(\d{4})(?=\d)/g, "$1-")
      : "",
  );

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

  const details = [
    { label: "Transaction ID", value: transactionId },
    { label: "Meter No", value: meterNumber },
    { label: "Distributor", value: distributor },
    { label: "Type", value: typeLabel },
    ...(token ? [{ label: "Token", value: token }] : []),
    { label: "Service", value: "Electricity" },
    {
      label: "Date & time",
      value: `${formattedDate} · ${formattedTime}`,
    },
  ];

  return (
    <TransactionSuccess
      title="Electricity purchased"
      amount={amount}
      subtitle={`${distributor} · ${typeLabel} · ${meterNumber}`}
      details={details}
      onDone={() => navigate("/dashboard", { replace: true })}
    />
  );
}

export default memo(ElectricitySuccessPage);
