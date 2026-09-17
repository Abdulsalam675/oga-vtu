import { memo } from "react";
import { Icon } from "@iconify/react";
import Modal from "../layout/Modal";

interface FundWalletModalProps {
  open: boolean;
  onClose: () => void;
}

const bankDetails = {
  bankName: "Kudipoint",
  accountNumber: "6604554630",
  accountName: "Abdulsalam umoru",
  charges: "₦30",
};

function FundWalletModal({ open, onClose }: FundWalletModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight text-gray-dark">
            Add money
          </h3>
          <p className="text-xs leading-relaxed text-gray-light">
            Share or copy these bank details to fund your wallet.
          </p>
        </div>

        <div className="space-y-3 rounded-2xl bg-gray-extra-light p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-light">Bank</span>
            <span className="text-sm font-semibold text-gray-dark">
              {bankDetails.bankName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-light">Account number</span>
            <span className="text-sm font-extrabold tracking-wide text-gray-dark">
              {bankDetails.accountNumber}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-light">Account name</span>
            <span className="max-w-[60%] text-right text-sm font-semibold text-gray-dark">
              {bankDetails.accountName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-light">Charges</span>
            <span className="text-sm font-semibold text-gray-dark">
              {bankDetails.charges}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-extra-light py-3.5 text-sm font-semibold text-gray-dark active:bg-gray-lightest"
          >
            <Icon icon="solar:copy-linear" className="h-4 w-4" />
            Copy
          </button>

          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white active:opacity-95"
          >
            <Icon icon="solar:share-linear" className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default memo(FundWalletModal);
