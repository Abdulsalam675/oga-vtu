import {
  memo,
  useRef,
  useState,
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
}

function CodeInput({ onChange, hasError }: CodeInputProps) {
  const length = 6;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(initializeValues);

  function initializeValues() {
    return Array.from({ length }, function getEmptyValue() {
      return "";
    });
  }

  // Update the values state and call the onChange callback with the concatenated value
  function updateValues(nextValues: string[]) {
    setValues(nextValues);
    onChange(nextValues.join(""));
  }

  // Handle input change for each digit
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

  // Handle backspace key to move focus to the previous input fluidly
  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace") {
      if (!values[index] && index > 0) {
        // If current input is empty, focus previous and clear it
        inputRefs.current[index - 1]?.focus();
        const nextValues = [...values];
        nextValues[index - 1] = "";
        updateValues(nextValues);
      } else if (values[index]) {
        // If current input has value, clear it out first
        const nextValues = [...values];
        nextValues[index] = "";
        updateValues(nextValues);
      }
    }
  }

  // Handle paste event to allow pasting the entire OTP code
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

  // Set the reference for each input to manage focus
  function setInputRef(index: number, element: HTMLInputElement | null) {
    inputRefs.current[index] = element;
  }

  // Handle input change and key down events for each input
  function handleInputChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    handleChange(index, event);
  }

  // Handle key down events for each input
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
            : "border-transparent focus:border-primary text-gray"
        }`}
      />
    );
  }

  return (
    <div
      className="flex justify-evenly w-full max-w-sm gap-2"
      role="group"
      aria-label="Verification code"
    >
      {/* Render each input box for the OTP digits */}
      {values.map(renderInput)}
    </div>
  );
}

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = "abdulsalamumoru247@gmail.com";
  const isPasswordReset = location.pathname.startsWith(
    "/forgot-password/verify-email",
  );

  function handleOtpChange(value: string) {
    setOtp(value);
    if (error) {
      setError("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = verifyEmailSchema.safeParse({ otp });

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ?? "Enter a valid verification code",
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate(
        isPasswordReset ? "/forgot-password/reset-password" : "/create-pin",
      );
    }, 2000);
  }

  return (
    <AuthFormLayout
      title="Enter OTP Code"
      subtitle={`We sent a 6-digit code to ${userEmail}`}
      linkLabel="Didn't Receive OTP? "
      linkTo="#"
      linkName="Resend in 59s"
      buttonLabel="Verify Email"
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {/* OTP Input Container */}
      <div className="flex flex-col items-center justify-center w-full">
        <CodeInput onChange={handleOtpChange} hasError={Boolean(error)} />
        {error && (
          <p
            className="mt-4 text-center text-sm font-medium text-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </AuthFormLayout>
  );
}

export default memo(VerifyEmail);
