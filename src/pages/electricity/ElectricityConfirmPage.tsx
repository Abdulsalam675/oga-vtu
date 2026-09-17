import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionConfirm from "../../components/layout/TransactionConfirm";

interface LocationState {
  discoId?: string;
  discoName?: string;
  discoShortName?: string;
  discoLogo?: string;
  meterType?: "prepaid" | "postpaid";
  meterNumber?: string;
  amount?: string;
}

function ElectricityConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const discoName = state.discoName || "Electricity";
  const discoShortName = state.discoShortName || "";
  const discoLogo = state.discoLogo || "";
  const meterType = state.meterType || "prepaid";
  const meterNumber = state.meterNumber || "";
  const amount = state.amount || "0";

  const [showPinModal, setShowPinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const typeLabel = meterType === "prepaid" ? "Prepaid" : "Postpaid";

  function handlePinComplete() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowPinModal(false);
      navigate("/dashboard/electricity/success", {
        state: {
          discoName,
          discoShortName,
          discoLogo,
          meterType,
          meterNumber,
          amount,
        },
      });
    }, 1500);
  }

  const subtitle = discoShortName
    ? `${discoShortName} · ${typeLabel}`
    : `${discoName} · ${typeLabel}`;

  const details = [
    { label: "Meter No", value: meterNumber },
    { label: "Distributor", value: discoShortName || discoName },
    { label: "Type", value: typeLabel },
    { label: "Product", value: "Electricity" },
    { label: "Fee", value: "Free" },
  ];

  return (
    <TransactionConfirm
      networkLogo={discoLogo}
      networkName={discoShortName || discoName}
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

export default memo(ElectricityConfirmPage);
