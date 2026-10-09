import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionConfirm from "../../components/layout/TransactionConfirm";

interface LocationState {
  phoneNumber?: string;
  networkName?: string;
  networkLogo?: string;
  amount?: string;
}

function AirtimeConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const phoneNumber = state.phoneNumber || "";
  const networkName = state.networkName || "MTN";
  const networkLogo = state.networkLogo || "/logo/networks/mtn.png";
  const amount = state.amount || "0";

  const [showPinModal, setShowPinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handlePinComplete() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowPinModal(false);
      navigate("/dashboard/airtime/success", {
        state: {
          phoneNumber,
          networkName,
          amount,
        },
      });
    }, 1500);
  }

  const details = [
    { label: "To", value: phoneNumber },
    { label: "Network", value: networkName },
    { label: "Product", value: "Airtime" },
    { label: "Fee", value: "Free" },
  ];

  return (
    <TransactionConfirm
      networkLogo={networkLogo}
      networkName={networkName}
      amount={amount}
      subtitle={`${networkName} Airtime`}
      details={details}
      isLoading={isLoading}
      onPay={() => setShowPinModal(true)}
      showPinModal={showPinModal}
      onClosePin={() => !isLoading && setShowPinModal(false)}
      onPinComplete={handlePinComplete}
    />
  );
}

export default memo(AirtimeConfirmPage);
