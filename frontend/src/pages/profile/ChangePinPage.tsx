import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import SubPageLayout from "../../components/layout/SubPageLayout";
import { createPinSchema } from "../../schemas/authSchemas";
import { getUserData, updateUserData } from "../../utilities/userStorage";
import toast from "react-hot-toast";

type FlowStep = "verify" | "create" | "confirm";

function ChangePinPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<FlowStep>("verify");
  const [pin, setPin] = useState("");
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const canSubmit = pin.length === 4;

  function handleNumberClick(number: string) {
    if (pin.length >= 4) return;
    setPin((prev) => prev + number);
    setError("");
  }

  function handleBackspace() {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  }

  function triggerMismatchFeedback(errorMessage: string) {
    setError(errorMessage);
    setIsShaking(true);

    window.setTimeout(() => {
      setIsShaking(false);
      setPin("");
    }, 500);
  }

  function handleLeftAction() {
    if (pin.length > 0) {
      handleBackspace();
      return;
    }

    if (step === "confirm") {
      setStep("create");
      setPin("");
      setFirstPin("");
      setError("");
      setIsShaking(false);
    }
  }

  function handleRightAction() {
    if (!canSubmit) return;

    if (step === "verify") {
      const user = getUserData();

      if (user?.pin !== pin) {
        triggerMismatchFeedback("Incorrect PIN");
        return;
      }

      setPin("");
      setError("");
      setStep("create");
      return;
    }

    if (step === "create") {
      setFirstPin(pin);
      setPin("");
      setError("");
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
      triggerMismatchFeedback(errorMessage);
      return;
    }

    updateUserData({ pin });
    navigate(-1);
    toast.success("PIN changed successfully");
  }

  const titles: Record<FlowStep, string> = {
    verify: "Enter current PIN",
    create: "Create new PIN",
    confirm: "Confirm new PIN",
  };

  const subtitles: Record<FlowStep, string> = {
    verify: "Enter your current 4-digit PIN to continue.",
    create: "Choose a new 4-digit PIN you can remember.",
    confirm: "Re-type your new PIN to confirm it matches.",
  };

  return (
    <SubPageLayout title="Change PIN">
      <div className="flex h-full min-h-[calc(100dvh-theme(spacing.24))] flex-col select-none">
        <div className="text-center">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-dark">
            {titles[step]}
          </h1>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-light">
            {subtitles[step]}
          </p>

          {/* PIN */}
          <div
            className={`mt-6 flex justify-center gap-3.5 ${
              isShaking ? "shake" : ""
            }`}
          >
            {[0, 1, 2, 3].map((index) => (
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
            ))}
          </div>

          {error && (
            <p
              className="mt-3 text-center text-sm font-medium text-error"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
        <div className="flex-1" />

        <div className="mx-auto mb-4 grid w-full max-w-[330px] grid-cols-3 gap-x-5 gap-y-4 px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberClick(num.toString())}
              aria-label={`Enter ${num}`}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-normal/6 text-2xl font-bold text-gray-dark transition-colors hover:bg-gray-lightest cursor-pointer"
            >
              {num}
            </button>
          ))}

          <button
            type="button"
            onClick={handleLeftAction}
            disabled={step === "verify" && pin.length === 0}
            aria-label={
              pin.length > 0
                ? "Delete last digit"
                : step === "confirm"
                  ? "Back to create PIN"
                  : "Unavailable"
            }
            className="mx-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-extra-light transition-colors active:bg-gray-lightest disabled:cursor-default disabled:opacity-20"
          >
            {pin.length > 0 ? (
              <Icon
                icon="solar:backspace-linear"
                className="h-7 w-7 text-gray-normal"
              />
            ) : step === "confirm" ? (
              <Icon
                icon="solar:arrow-left-linear"
                className="h-7 w-7 text-gray-dark"
              />
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => handleNumberClick("0")}
            aria-label="Enter 0"
            className="mx-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl bg-gray-normal/6 text-2xl font-bold text-gray-dark transition-colors active:bg-gray-lightest"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleRightAction}
            disabled={!canSubmit}
            aria-label={step === "confirm" ? "Save PIN" : "Continue"}
            className={
              "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-all duration-200 " +
              (canSubmit
                ? "cursor-pointer bg-primary opacity-100"
                : "pointer-events-none cursor-not-allowed bg-gray-light opacity-40")
            }
          >
            <Icon icon="solar:arrow-right-linear" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </SubPageLayout>
  );
}

export default memo(ChangePinPage);
