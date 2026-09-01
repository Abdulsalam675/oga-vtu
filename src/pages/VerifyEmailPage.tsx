import {
  memo,
  useRef,
  useState,
  useEffect,
  type ClipboardEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";
import { verifyEmailSchema } from "../schemas/authSchemas";

interface CodeInputProps {
  onChange: (value: string) => void;
  hasError: boolean;
  isShaking: boolean;
}

function CodeInput({ onChange, hasError, isShaking }: CodeInputProps) {
  const length = 6;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(initializeValues);

  function initializeValues() {
    return Array.from({ length }, function getEmptyValue() {
      return "";
    });
  }

  function updateValues(nextValues: string[]) {
    setValues(nextValues);
    onChange(nextValues.join(""));
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const enteredValue = event.target.value.slice(-1);

    if (enteredValue && !/^\d$/.test(enteredValue)) {
      return;
    }

    const nextValues = [...values];
    nextValues[index] = enteredValue;
    updateValues(nextValues);

    if (enteredValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      if (!values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const nextValues = [...values];
        nextValues[index - 1] = "";
        updateValues(nextValues);
      } else if (values[index]) {
        const nextValues = [...values];
        nextValues[index] = "";
        updateValues(nextValues);
      }
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    const nextValues = Array.from(
      { length },
      function getPastedValue(_, index) {
        return pastedValue[index] ?? "";
      },
    );
    updateValues(nextValues);
    inputRefs.current[Math.min(pastedValue.length, length - 1)]?.focus();
  }

  function setInputRef(index: number, element: HTMLInputElement | null) {
    inputRefs.current[index] = element;
  }

  function handleInputChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    handleChange(index, event);
  }

  function handleInputKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    handleKeyDown(index, event);
  }

  function renderInput(value: string, index: number) {
    return (
      <input
        key={index}
        ref={function assignInputRef(element) {
          setInputRef(index, element);
        }}
        type="text"
        inputMode="numeric"
        maxLength={1}
        value={value}
        autoFocus={index === 0}
        onChange={function handleInputChangeEvent(event) {
          handleInputChange(index, event);
        }}
        onKeyDown={function handleInputKeyDownEvent(event) {
          handleInputKeyDown(index, event);
        }}
        onPaste={handlePaste}
        aria-label={`Digit ${index + 1}`}
        className={`h-12 w-12 text-center text-2xl font-bold outline-none border rounded-xl transition-all duration-200 ${
          hasError
            ? "border-error focus:border-error"
            : "border-transparent focus:border-primary text-gray-dark"
        }`}
      />
    );
  }

  return (
    <div
      className={`flex justify-evenly w-full max-w-sm gap-2 transition-all duration-200 ${
        isShaking ? "shake" : ""
      }`}
      role="group"
      aria-label="Verification code"
    >
      {values.map(renderInput)}
    </div>
  );
}

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = "abdulsalamumoru247@gmail.com";
  const isPasswordReset = location.pathname.startsWith(
    "/forgot-password/verify-email",
  );

  // Timer countdown effect
  useEffect(() => {
    if (timer <= 0) return;

    const interval = window.setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  function handleOtpChange(value: string) {
    setOtp(value);
    if (error) {
      setError("");
      setIsShaking(false);
    }

    // Auto-verify when 6 digits entered
    if (value.length === 6) {
      validateOtp(value);
    }
  }

  function triggerInvalidFeedback(errorMessage: string) {
    setError(errorMessage);
    setIsShaking(true);

    window.setTimeout(function () {
      setIsShaking(false);
      setOtp("");
    }, 500);
  }

  function validateOtp(otpValue: string) {
    const result = verifyEmailSchema.safeParse({ otp: otpValue });

    if (!result.success) {
      const errorMessage =
        result.error.issues[0]?.message || "Invalid verification code";
      triggerInvalidFeedback(errorMessage);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate(
        isPasswordReset ? "/forgot-password/reset-password" : "/create-pin",
      );
    }, 2000);
  }

  function handleResendOtp() {
    // Reset timer to 60 seconds
    setTimer(60);
    setOtp("");
    setError("");
    setIsShaking(false);
    // TODO: Call API to resend OTP
    console.log("Resend OTP");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateOtp(otp);
  }

  return (
    <AuthFormLayout
      title="Enter OTP Code"
      subtitle={`We sent a 6-digit code to ${userEmail}`}
      buttonLabel="Verify Email"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {/* OTP Input Container */}
      <div className="flex flex-col items-center justify-center w-full">
        <CodeInput
          onChange={handleOtpChange}
          hasError={Boolean(error)}
          isShaking={isShaking}
        />
        {error && (
          <p
            className="mt-4 text-center text-sm font-medium text-error animate-fade-in"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Resend OTP Button */}
        <div className="mt-5">
          {timer > 0 ? (
            <p className="text-sm text-gray-semi-dark">
              Resend code in{" "}
              <span className="font-semibold text-primary">{timer}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-sm font-semibold text-primary hover:opacity-75 transition-opacity cursor-pointer"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </AuthFormLayout>
  );
}

export default memo(VerifyEmail);
