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
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  // Submit only needs 4 digits entered — match is checked on submit
  const canSubmit = pin.length === 4;

  function handleNumberClick(number: string) {
    if (pin.length >= 4) return;
    setPin(function (prev) {
      return prev + number;
    });
    setError("");
  }

  function handleBackspace() {
    setPin(function (prev) {
      return prev.slice(0, -1);
    });
    setError("");
  }

  function handleLeftAction() {
    if (pin.length > 0) {
      handleBackspace();
      return;
    }

    // Only confirm → create (never back to verify email)
    if (step === "confirm") {
      setStep("create");
      setPin("");
      setFirstPin("");
      setError("");
      setIsShaking(false);
    }
  }

  function triggerMismatchFeedback(errorMessage: string) {
    setError(errorMessage); // ← From Zod
    setIsShaking(true);

    window.setTimeout(function () {
      setIsShaking(false);
      setPin("");
    }, 500);
  }

  function handleRightAction() {
    if (!canSubmit) return;

    if (step === "create") {
      setFirstPin(pin);
      setPin("");
      setError("");
      setIsShaking(false);
      setStep("confirm");
      return;
    }

    const result = createPinSchema.safeParse({
      pin: firstPin,
      confirmPin: pin,
    });

    if (!result.success) {
      const errorMessage =
        result.error.issues[0]?.message || "PINs do not match";
      triggerMismatchFeedback(errorMessage); // ← Pass error from Zod
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-white select-none text-gray-dark antialiased">
      <section className="mx-auto flex h-full w-full max-w-md flex-col px-4 pt-6 pb-8 sm:pt-8 sm:pb-6">
        <div className="shrink-0 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {step === "create"
              ? "Create your Security PIN"
              : "Confirm your Security PIN"}
          </h1>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-semi-dark">
            {step === "create"
              ? "Your 4-digit PIN secures your wallet, payouts, and utility transactions."
              : "Re-type your 4-digit PIN to ensure it matches perfectly."}
          </p>

          {/* PIN dots — red + shake on mismatch */}
          <div
            className={`mt-6 flex justify-center gap-3.5 ${
              isShaking ? "shake" : ""
            }`}
          >
            {[0, 1, 2, 3].map(function (index) {
              return (
                <div
                  key={index}
                  className={`h-3.5 w-3.5 rounded-full border transition-all duration-200 ${
                    index < pin.length
                      ? error
                        ? "border-error bg-error"
                        : "border-primary bg-primary scale-110"
                      : "border-transparent bg-gray-lighter"
                  }`}
                />
              );
            })}
          </div>

          {error ? (
            <p
              className="mt-3 text-center text-sm font-medium text-error"
              role="alert"
            >
              {error}
            </p>
          ) : (
            <p className="mt-3 text-center text-sm text-gray-semi-dark">
              {step === "create"
                ? "Enter a PIN you can remember"
                : "Confirm your entered numbers"}
            </p>
          )}
        </div>

        <div className="flex-1" />

        <div className="mx-auto grid w-full max-w-[330px] shrink-0 grid-cols-3 gap-x-5 gap-y-4 px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
            return (
              <button
                key={num}
                type="button"
                onClick={function () {
                  handleNumberClick(num.toString());
                }}
                aria-label={"Enter " + num}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-extra-light text-2xl font-bold text-gray-dark transition-colors hover:bg-gray-lightest cursor-pointer"
              >
                {num}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleLeftAction}
            disabled={step === "create" && pin.length === 0}
            aria-label={
              pin.length > 0
                ? "Delete last digit"
                : step === "confirm"
                  ? "Back to create PIN"
                  : "Cancel unavailable"
            }
            className="mx-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-extra-light font-semibold text-gray-normal transition-colors hover:bg-gray-lightest active:bg-gray-lightest disabled:cursor-default disabled:opacity-20 disabled:hover:bg-gray-extra-light"
          >
            {pin.length > 0 ? (
              <Icon icon="solar:backspace-linear" className="h-7 w-7" />
            ) : step === "confirm" ? (
              <Icon
                icon="solar:arrow-left-linear"
                className="h-7 w-7 text-gray-semi-dark"
              />
            ) : null}
          </button>

          <button
            type="button"
            onClick={function () {
              handleNumberClick("0");
            }}
            aria-label="Enter 0"
            className="mx-auto cursor-pointer flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-extra-light text-2xl font-bold text-gray-dark transition-colors active:bg-gray-lightest"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleRightAction}
            disabled={!canSubmit}
            aria-label={step === "create" ? "Continue" : "Submit PIN"}
            className={
              "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-all duration-200 " +
              (canSubmit
                ? "bg-primary opacity-100 cursor-pointer"
                : "pointer-events-none bg-gray-light opacity-40 shadow-none cursor-not-allowed ")
            }
          >
            <Icon icon="solar:arrow-right-linear" className="h-7 w-7" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default memo(CreatePin);
