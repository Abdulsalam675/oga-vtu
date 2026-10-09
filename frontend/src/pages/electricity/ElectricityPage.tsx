import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import Button from "../../components/buttons/Button";
import SelectOptionModal from "../../components/modals/SelectOptionModal";
import ServiceDetailsFields from "../../components/inputs/ServiceDetailsFields";
import AmountFields from "../../components/inputs/AmountFields.tsx";

type Disco = {
  id: string;
  name: string;
  subtitle: string;
  logo?: string;
};

type MeterType = "prepaid" | "postpaid";

const discos: Disco[] = [
  {
    id: "aedc",
    name: "AEDC",
    subtitle: "Abuja Electricity",
    logo: "/logo/electricity/aedc.png",
  },
  {
    id: "aple",
    name: "APLE",
    subtitle: "Aba Power",
    logo: "/logo/electricity/aple.png",
  },
  {
    id: "bedc",
    name: "BEDC",
    subtitle: "Benin Electricity",
    logo: "/logo/electricity/bedc.png",
  },
  {
    id: "eedc",
    name: "EEDC",
    subtitle: "Enugu Electricity",
    logo: "/logo/electricity/eedc.png",
  },
  {
    id: "ekedc",
    name: "EKEDC",
    subtitle: "Eko Electricity",
    logo: "/logo/electricity/ekedc.png",
  },
  {
    id: "ibedc",
    name: "IBEDC",
    subtitle: "Ibadan Electricity",
    logo: "/logo/electricity/ibedc.png",
  },
  {
    id: "ikedc",
    name: "IKEDC",
    subtitle: "Ikeja Electric",
    logo: "/logo/electricity/ikedc.png",
  },
  {
    id: "jed",
    name: "JED",
    subtitle: "Jos Electricity",
    logo: "/logo/electricity/jed.png",
  },
  {
    id: "kaedco",
    name: "KAEDCO",
    subtitle: "Kaduna Electric",
    logo: "/logo/electricity/kaedco.png",
  },
  {
    id: "kedco",
    name: "KEDCO",
    subtitle: "Kano Electricity",
    logo: "/logo/electricity/kedco.png",
  },
  {
    id: "phed",
    name: "PHED",
    subtitle: "Port Harcourt Electric",
    logo: "/logo/electricity/phed.png",
  },
  {
    id: "yedc",
    name: "YEDC",
    subtitle: "Yola Electricity",
    logo: "/logo/electricity/yedc.png",
  },
];

const predefinedAmounts = [1000, 2000, 3000, 5000, 10000, 20000];
const MIN_AMOUNT = 500;

function ElectricityPage() {
  const navigate = useNavigate();

  const [meterType, setMeterType] = useState<MeterType>("prepaid");
  const [selectedDisco, setSelectedDisco] = useState<Disco>(discos[0]);
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showDiscoModal, setShowDiscoModal] = useState(false);

  function handleSelectDisco(item: {
    id: string;
    name: string;
    logo?: string;
    subtitle?: string;
  }) {
    setSelectedDisco({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle || "",
      logo: item.logo,
    });
    setShowDiscoModal(false);
  }

  function goToConfirm(payAmount: string) {
    navigate("/dashboard/electricity/confirm", {
      state: {
        discoId: selectedDisco.id,
        discoName: selectedDisco.subtitle,
        discoShortName: selectedDisco.name,
        discoLogo: selectedDisco.logo,
        meterType,
        meterNumber,
        amount: payAmount,
      },
    });
  }

  function handleContinue() {
    if (!canContinue) return;
    goToConfirm(amount);
  }

  function handlePresetClick(value: number) {
    if (meterNumber.trim().length < 10) {
      alert("Enter a valid meter number");
      return;
    }

    goToConfirm(String(value));
  }

  const canContinue =
    meterNumber.trim().length >= 10 && Number(amount) >= MIN_AMOUNT;

  return (
    <SubPageLayout title="Electricity" titleSize="sm">
      <div className="space-y-6">
        <ServiceDetailsFields
          label="Meter details"
          selectedOption={selectedDisco}
          selectPlaceholder="Select provider"
          inputPlaceholder="Meter number"
          value={meterNumber}
          maxLength={13}
          fallbackIcon="solar:lightbulb-bolt-linear"
          getOptionLabel={(option) =>
            option.subtitle
              ? `${option.name} · ${option.subtitle}`
              : option.name
          }
          onSelect={() => setShowDiscoModal(true)}
          onChange={setMeterNumber}
          beforeFields={
            <div className="grid grid-cols-2 gap-1 rounded-full bg-gray-extra-light p-1">
              <button
                type="button"
                onClick={() => setMeterType("prepaid")}
                className={
                  "cursor-pointer rounded-full py-2.5 text-sm font-semibold transition-colors " +
                  (meterType === "prepaid"
                    ? "bg-primary text-white"
                    : "bg-transparent text-gray-semi-dark")
                }
              >
                Prepaid
              </button>
              <button
                type="button"
                onClick={() => setMeterType("postpaid")}
                className={
                  "cursor-pointer rounded-full py-2.5 text-sm font-semibold transition-colors " +
                  (meterType === "postpaid"
                    ? "bg-primary text-white"
                    : "bg-transparent text-gray-semi-dark")
                }
              >
                Postpaid
              </button>
            </div>
          }
        />

        <AmountFields
          amount={amount}
          onAmountChange={setAmount}
          presetAmounts={predefinedAmounts}
          onPresetClick={handlePresetClick}
          presetContainerClassName={
            "grid grid-cols-3 gap-3 overflow-hidden transition-all duration-250 ease-out " +
            (meterType === "prepaid"
              ? "mt-5 max-h-48 opacity-100"
              : "mt-0 max-h-0 opacity-0")
          }
          presetTabIndex={meterType === "prepaid" ? 0 : -1}
        />

        <Button
          label="Continue"
          htmlType="button"
          disabled={!canContinue}
          onClick={handleContinue}
        />

        <SelectOptionModal
          open={showDiscoModal}
          title="Select provider"
          options={discos}
          selectedId={selectedDisco.id}
          onClose={() => setShowDiscoModal(false)}
          onSelect={handleSelectDisco}
          fallbackIcon="solar:lightbulb-bolt-linear"
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(ElectricityPage);
