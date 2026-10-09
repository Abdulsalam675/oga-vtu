import { memo, useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../layout/Modal";

interface PinKeypadModalProps {
  open: boolean;
  onClose?: () => void;
  onComplete?: (pin: string) => void;
  isLoading?: boolean;
}

function PinKeypadModal({
  open,
  onClose,
  onComplete,
  isLoading = false,
}: PinKeypadModalProps) {
  const [pin, setPin] = useState("");

  function handleKeyPress(digit: string) {
    if (pin.length >= 4 || isLoading) return;

    const nextPin = pin + digit;
    setPin(nextPin);

    if (nextPin.length === 4) {
      onComplete?.(nextPin);
    }
  }

  function handleBackspace() {
    setPin((prev) => prev.slice(0, -1));
  }

  function handleClose() {
    setPin("");
    onClose?.();
  }

  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  return (
    <Modal open={open} onClose={handleClose} showDash={false}>
      <div>
        <div className="mb-2 flex items-center justify-center">
          <h2 className="text-base font-medium tracking-tight text-gray-dark ">
            Enter Payment PIN
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="fixed right-5"
          >
            <Icon icon="solar:close-bold" className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 flex justify-center gap-3">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pin.length;

            return (
              <div
                key={index}
                className={`flex h-11 w-10 items-center justify-center rounded-md transition-colors bg-gray-lightest ${
                  isFilled ? "border-primary" : ""
                }`}
              >
                {isFilled && (
                  <span className="h-3 w-3 rounded-full bg-primary" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-4 flex items-center justify-center gap-1.5">
          <Icon
            icon="solar:shield-check-bold"
            className="h-4 w-4 text-primary"
          />
          <span className="text-xs font-medium text-gray-light">
            Oga Secure Numeric Keypad
          </span>
        </div>

        <div className="space-y-2">
          {keypadRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-2">
              {row.map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeyPress(digit)}
                  disabled={isLoading}
                  className="rounded-lg bg-gray-extra-light py-2 text-2xl font-semibold text-gray-semi-dark transition-colors active:bg-gray-lightest disabled:opacity-50"
                >
                  {digit}
                </button>
              ))}
            </div>
          ))}

          <div className="grid grid-cols-3 gap-2">
            <div />
            <button
              type="button"
              onClick={() => handleKeyPress("0")}
              disabled={isLoading}
              className="rounded-lg bg-gray-extra-light py-2 text-2xl font-semibold text-gray-dark transition-colors active:bg-gray-lightest disabled:opacity-50"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              disabled={isLoading}
              aria-label="Backspace"
              className="flex items-center justify-center rounded-xl bg-gray-extra-light py-4 transition-colors active:bg-gray-lightest disabled:opacity-50"
            >
              <Icon
                icon="solar:backspace-linear"
                className="h-6 w-6 text-gray-dark"
              />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default memo(PinKeypadModal);
