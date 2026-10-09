import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Modal from "../layout/Modal";
import Button from "../buttons/Button";

interface KycRequiredModalProps {
  open: boolean;
  onClose: () => void;
}

function KycRequiredModal({ open, onClose }: KycRequiredModalProps) {
  const navigate = useNavigate();

  function handleContinue() {
    onClose();
    navigate("/dashboard/bvn");
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-extra-light">
            <Icon
              icon="solar:shield-check-linear"
              className="h-6 w-6 text-gray-dark"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold tracking-tight text-gray-dark">
            Verify your identity
          </h3>

          <p className="mt-1.5 text-sm leading-relaxed text-gray-light">
            Complete your BVN verification before funding your wallet or
            receiving a virtual account.
          </p>
        </div>

        {/* Requirements */}
        <div className="rounded-2xl bg-gray-extra-light px-4 py-4">
          <p className="text-xs font-semibold text-gray-dark">
            You&apos;ll need
          </p>

          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3">
              <Icon
                icon="solar:card-linear"
                className="h-4 w-4 shrink-0 text-gray-semi-dark"
              />
              <span className="text-sm text-gray-semi-dark">
                Your 11-digit BVN
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Icon
                icon="solar:calendar-linear"
                className="h-4 w-4 shrink-0 text-gray-semi-dark"
              />
              <span className="text-sm text-gray-semi-dark">
                Your date of birth
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <Button label="Continue" htmlType="button" onClick={handleContinue} />

          <button
            type="button"
            onClick={onClose}
            className="w-full cursor-pointer py-2.5 text-center text-sm font-semibold text-gray-semi-dark transition-colors active:text-gray-dark"
          >
            Not now
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default memo(KycRequiredModal);
