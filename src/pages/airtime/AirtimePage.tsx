import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import Button from "../../components/buttons/Button";
import PhoneNetworkFields from "../../components/inputs/PhoneNetworkFields";
import SelectOptionModal from "../../components/modals/SelectOptionModal";
import AmountFields from "../../components/inputs/AmountFields.tsx";
import { useUser } from "../../context/UserContext.tsx";

const MIN_AMOUNT = 50;

function AirtimePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const userPhoneNumber = user?.phoneNumber || "";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedNetworkId, setSelectedNetworkId] = useState("mtn");
  const [selectedNetwork, setSelectedNetwork] = useState("MTN");
  const [selectedNetworkLogo, setSelectedNetworkLogo] = useState(
    "/logo/networks/mtn.png",
  );
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const predefinedAmounts = [50, 100, 200, 300, 400, 500];

  const networks = [
    { id: "mtn", name: "MTN", logo: "/logo/networks/mtn.png" },
    { id: "airtel", name: "Airtel", logo: "/logo/networks/airtel.png" },
    { id: "glo", name: "Glo", logo: "/logo/networks/glo.png" },
    {
      id: "9mobile",
      name: "T2(9Mobile)",
      logo: "/logo/networks/t2-9mobile.png",
    },
  ];

  function handleSelectNetwork(network: {
    id: string;
    name: string;
    logo?: string;
  }) {
    setSelectedNetworkId(network.id);
    setSelectedNetwork(network.name);
    setSelectedNetworkLogo(network.logo || "");
    setShowModal(false);
  }

  function handleBuyForSelf() {
    if (userPhoneNumber) {
      setPhoneNumber(userPhoneNumber);
    }
  }

  function goToConfirm(payAmount: string) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/airtime/confirm", {
        state: {
          phoneNumber,
          networkName: selectedNetwork,
          networkLogo: selectedNetworkLogo,
          amount: payAmount,
        },
      });
    }, 800);
  }

  function handleContinue() {
    if (!canContinue) return;
    goToConfirm(amount);
  }

  function handlePresetClick(value: number) {
    if (phoneNumber.trim().length < 10) {
      alert("Enter a valid phone number");
      return;
    }

    goToConfirm(String(value));
  }

  const canContinue =
    phoneNumber.trim().length >= 10 &&
    selectedNetworkId !== "" &&
    Number(amount) >= MIN_AMOUNT;

  return (
    <SubPageLayout title="Buy Airtime" titleSize="sm">
      <div className="space-y-6">
        <PhoneNetworkFields
          phoneNumber={phoneNumber}
          onPhoneChange={setPhoneNumber}
          userPhoneNumber={userPhoneNumber}
          onBuyForSelf={handleBuyForSelf}
          selectedNetwork={selectedNetwork}
          selectedNetworkLogo={selectedNetworkLogo}
          onNetworkClick={() => setShowModal(true)}
        />

        <AmountFields
          amount={amount}
          onAmountChange={setAmount}
          presetAmounts={predefinedAmounts}
          onPresetClick={handlePresetClick}
          presetContainerClassName="mt-5 grid grid-cols-3 gap-3.5"
          presetButtonClassName="cursor-pointer rounded-lg bg-gray-extra-light px-3 py-6 text-base font-medium text-gray-dark transition-colors active:bg-gray-lightest disabled:opacity-50"
          presetDisabled={isLoading}
        />

        <Button
          label="Continue"
          htmlType="button"
          disabled={!canContinue || isLoading}
          loading={isLoading}
          onClick={handleContinue}
        />

        <SelectOptionModal
          open={showModal}
          title="Select network"
          options={networks}
          selectedId={selectedNetworkId}
          onClose={() => setShowModal(false)}
          onSelect={handleSelectNetwork}
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(AirtimePage);
