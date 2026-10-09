import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionConfirm from "../../components/layout/TransactionConfirm";

interface LocationState {
  providerId?: string;
  providerName?: string;
  providerSubtitle?: string;
  providerLogo?: string;
  smartCardNumber?: string;
  packageName?: string;
  packageDescription?: string;
  packageValidity?: string;
  amount?: string;
}

function CableTvConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const providerName = state.providerName || "Cable TV";
  const providerLogo = state.providerLogo || "";
  const smartCardNumber = state.smartCardNumber || "";
  const packageName = state.packageName || "";
  const packageValidity = state.packageValidity || "";
  const amount = state.amount || "0";

  const [showPinModal, setShowPinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePinComplete() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowPinModal(false);
      navigate("/dashboard/cable-tv/success", {
        state: {
          providerName,
          providerLogo,
          smartCardNumber,
          packageName,
          packageValidity,
          amount,
        },
      });
    }, 1500);
  }

  const subtitle = packageName
    ? `${providerName} · ${packageName}`
    : providerName;

  const details = [
    { label: "Smartcard No", value: smartCardNumber },
    { label: "Provider", value: providerName },
    { label: "Package", value: packageName },
    { label: "Duration", value: packageValidity },
    { label: "Fee", value: "Free" },
  ];

  return (
    <TransactionConfirm
      networkLogo={providerLogo}
      networkName={providerName}
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

export default memo(CableTvConfirmPage);
