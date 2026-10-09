import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionConfirm from "../../components/layout/TransactionConfirm";

interface LocationState {
  phoneNumber?: string;
  networkName?: string;
  networkLogo?: string;
  amount?: string;
  planName?: string;
  planValidity?: string;
}

function DataConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const phoneNumber = state.phoneNumber || "";
  const networkName = state.networkName || "MTN";
  const networkLogo = state.networkLogo || "/logo/networks/mtn.png";
  const amount = state.amount || "0";
  const planName = state.planName || "Data plan";
  const planValidity = state.planValidity || "";

  const [showPinModal, setShowPinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePinComplete() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowPinModal(false);
      navigate("/dashboard/data/success", {
        state: {
          phoneNumber,
          networkName,
          amount,
          planName,
          planValidity,
        },
      });
    }, 1500);
  }

  const subtitle = planValidity
    ? `${networkName} · ${planName} · ${planValidity}`
    : `${networkName} · ${planName}`;

  const details = [
    { label: "To", value: phoneNumber },
    { label: "Network", value: networkName },
    { label: "Plan", value: planName },
    ...(planValidity ? [{ label: "Validity", value: planValidity }] : []),
    { label: "Product", value: "Data" },
    { label: "Fee", value: "Free" },
  ];
  return (
    <TransactionConfirm
      networkLogo={networkLogo}
      networkName={networkName}
      amount={amount}
      subtitle={subtitle}
      details={details}
      isLoading={isLoading}
      onPay={() => setShowPinModal(true)}
      showPinModal={showPinModal}
      onClosePin={() => !isLoading && setShowPinModal(false)}
      onPinComplete={handlePinComplete}
    />
  );
}

export default memo(DataConfirmPage);
