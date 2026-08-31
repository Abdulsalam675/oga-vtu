import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { createPinSchema } from "../schemas/authSchemas";

type FlowStep = "create" | "confirm";

function CreatePin() {
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<FlowStep>("create");
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleNumberClick(number: string) {
    if (pin.length >= 4) return;

    const nextPin = pin + number;
    setPin(nextPin);
    setError("");

    // Auto-advance trigger logic
    if (nextPin.length === 4) {
      setTimeout(() => {
        if (step === "create") {
          setFirstPin(nextPin);
          setPin("");
          setStep("confirm");
        } else {
          const result = createPinSchema.safeParse({
            pin: firstPin,
            confirmPin: nextPin,
          });

          if (!result.success) {
            setError(result.error.issues[0]?.message || "PINs do not match");
            setPin("");
            return;
          }

          navigate("/dashboard");
        }
      }, 2000); // 2-second delay
    }
  }
  function handleBackspace() {
    setPin(pin.slice(0, -1));
  }

  return (
    <div className="min-h-screen w-full flex items-stretch select-none text-gray-dark antialiased pt-4 md:pt-0">
      <section className="w-full flex flex-col items-center bg-white px-4 py-6 sm:px-8 sm:py-10">
        <div className="flex w-full max-w-sm flex-1 flex-col justify-between">
          {/* Top content wrapper */}
          <div className="w-full">
            {/* Title & Subtitle */}
            <div className="mb-8 space-y-2 text-center sm:mb-10">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-dark sm:text-3xl">
                {step === "create"
                  ? "Create your Security PIN"
                  : "Confirm your Security PIN"}
              </h1>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-semi-dark sm:text-base">
                {step === "create"
                  ? "Your 4-digit PIN secures your wallet, payouts, and utility transactions."
                  : "Re-type your 4-digit PIN to ensure it matches perfectly."}
              </p>
            </div>

            {/* PIN Display (dots) */}
            <div className="mb-5 flex justify-center gap-3 sm:gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`h-3.5 w-3.5 rounded-full transition-colors sm:h-4 sm:w-4 ${
                    index < pin.length ? "bg-primary" : "bg-gray-lighter"
                  }`}
                ></div>
              ))}
            </div>

            {/* Helper Text */}
            <p className="text-center text-sm text-gray-semi-dark">
              {step === "create"
                ? "Enter a PIN you can remember"
                : "Confirm your entered numbers"}
            </p>
            {error && (
              <p className="mt-2 text-center text-sm text-error" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Numeric Keypad Centered */}
          <div className="mx-auto grid w-full max-w-[320px] grid-cols-3 gap-x-4 gap-y-5 py-6">
            {/* Numbers 1 to 9 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleNumberClick(num.toString())}
                aria-label={`Enter ${num}`}
                className="h-16 w-16 mx-auto rounded-lg bg-gray-extra-light p-0 text-2xl font-semibold text-gray-dark transition-colors hover:bg-gray-lightest active:bg-gray-lightest"
              >
                {num}
              </button>
            ))}

            {/* Bottom Left: Invisible Grid Spacer */}
            <div className="h-16 w-16" aria-hidden="true" />

            {/* Bottom Center: Number 0 */}
            <button
              type="button"
              onClick={() => handleNumberClick("0")}
              aria-label="Enter 0"
              className="h-16 w-16 mx-auto rounded-lg bg-gray-light p-0 text-2xl font-semibold text-gray-dark transition-colors hover:bg-gray-lighter active:bg-gray-lighter"
            >
              0
            </button>

            {/* Bottom Right (Backspace) */}
            <button
              type="button"
              onClick={handleBackspace}
              disabled={pin.length === 0}
              aria-label="Clear last PIN digit"
              className="h-16 w-16 mx-auto rounded-lg p-0 text-gray-light transition-colors hover:bg-gray-lightest active:bg-gray-lightest flex items-center justify-center disabled:opacity-20 disabled:hover:bg-transparent"
            >
              <Icon
                icon="solar:backspace-linear"
                width={24}
                height={24}
                className="text-gray-light"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(CreatePin);
