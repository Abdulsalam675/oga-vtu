import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionConfirm from "../../components/layout/TransactionConfirm";

interface LocationState {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  amount?: string;
  narration?: string;
  availableBalance?: number;
}

function TransferConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const bankName = state.bankName || "";
  const accountNumber = state.accountNumber || "";
  const accountName = state.accountName || "Beneficiary";
  const amount = state.amount || "0";
  const narration = state.narration || "";

  const [showPinModal, setShowPinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const subtitle = `${accountName} · ${bankName}`;

  const details = [
    { label: "To", value: accountName },
    { label: "Account NO", value: accountNumber },
    { label: "Bank", value: bankName },
    { label: "Narration", value: narration || "—" },
    { label: "Fee", value: "Free" },
  ];

  function handlePinComplete() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowPinModal(false);
      navigate("/dashboard/transfer/success", {
        state: {
          bankName,
          accountNumber,
          accountName,
          amount,
          narration,
        },
      });
    }, 1500);
  }

  return (
    <TransactionConfirm
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

export default memo(TransferConfirmPage);
