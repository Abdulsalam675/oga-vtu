import { memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPageLayout from "../../components/layout/SubPageLayout";
import Button from "../../components/buttons/Button";
import SelectOptionModal from "../../components/modals/SelectOptionModal";
import ServiceDetailsFields from "../../components/inputs/ServiceDetailsFields";

type Bank = {
  id: string;
  name: string;
  logo?: string;
};

const banks: Bank[] = [
  { id: "access", name: "Access Bank" },
  { id: "gtb", name: "GTBank" },
  { id: "uba", name: "UBA" },
  { id: "zenith", name: "Zenith Bank" },
  { id: "opay", name: "OPay" },
  { id: "moniepoint", name: "Moniepoint" },
  { id: "palmpay", name: "PalmPay" },
  { id: "kuda", name: "Kuda" },
];

function TransferPage() {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);

  const accountName = useMemo(() => {
    if (!selectedBank || accountNumber.trim().length < 10) return "";
    return "Abdulsalam Umoru";
  }, [selectedBank, accountNumber]);

  const canContinue =
    !!selectedBank && accountNumber.trim().length >= 10 && accountName !== "";

  function handleSelectBank(item: { id: string; name: string; logo?: string }) {
    setSelectedBank({
      id: item.id,
      name: item.name,
      logo: item.logo,
    });
    setShowBankModal(false);
  }

  function handleContinue() {
    if (!canContinue || !selectedBank) return;

    navigate("/dashboard/transfer/amount", {
      state: {
        bankId: selectedBank.id,
        bankName: selectedBank.name,
        accountNumber,
        accountName,
      },
    });
  }

  return (
    <SubPageLayout title="Transfer" titleSize="sm">
      <div className="space-y-6">
        <ServiceDetailsFields
          label="Recipient"
          selectedOption={selectedBank}
          selectPlaceholder="Select bank"
          inputPlaceholder="Account number"
          value={accountNumber}
          maxLength={10}
          fallbackIcon="solar:building-linear"
          onSelect={() => setShowBankModal(true)}
          onChange={setAccountNumber}
        >
          <div
            className={
              "grid transition-all duration-300 ease-out " +
              (accountName
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0")
            }
          >
            <div className="overflow-hidden">
              <div className="flex items-center rounded-b-xl bg-primary/10 px-4 py-3">
                <p className="text-sm font-semibold text-primary">
                  {accountName}
                </p>
              </div>
            </div>
          </div>
        </ServiceDetailsFields>

        <Button
          label="Continue"
          htmlType="button"
          disabled={!canContinue}
          onClick={handleContinue}
        />

        <SelectOptionModal
          open={showBankModal}
          title="Select bank"
          options={banks}
          selectedId={selectedBank?.id}
          onClose={() => setShowBankModal(false)}
          onSelect={handleSelectBank}
          fallbackIcon="solar:building-linear"
        />
      </div>
    </SubPageLayout>
  );
}

export default memo(TransferPage);
