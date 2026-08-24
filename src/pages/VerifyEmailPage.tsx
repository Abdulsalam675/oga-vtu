import {
  memo,
  useRef,
  useState,
  type ClipboardEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import AuthFormLayout from "../components/layout/AuthFormLayout";

function CodeInput({ onChange }: { onChange: (value: string) => void }) {
  const length = 6;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(initializeValues);

  function initializeValues() {
    return Array.from({ length }, function getEmptyValue() {
      return "";
    });
  }

  {
    /* Update the values state and call the onChange callback with the concatenated value */
  }
  function updateValues(nextValues: string[]) {
    setValues(nextValues);
    onChange(nextValues.join(""));
  }

  {
    /* Handle input change for each digit */
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

  {
    /* Handle backspace key to move focus to the previous input */
  }
  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  {
    /* Handle paste event to allow pasting the entire OTP code */
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

  {
    /* Set the reference for each input to manage focus */
  }
  function setInputRef(index: number, element: HTMLInputElement | null) {
    inputRefs.current[index] = element;
  }

  {
    /* Handle input change and key down events for each input */
  }
  function handleInputChange(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    handleChange(index, event);
  }

  {
    /* Handle key down events for each input */
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
        className="h-12 w-12 text-center text-2xl font-bold outline-none transition-colors rounded-xl pin-input"
      />
    );
  }

  return (
    <div
      className="flex justify-evenly w-full"
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
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length === 6) {
      navigate("/create-pin");
    }
  }

  console.log("OTP entered:", otp);

  return (
    <AuthFormLayout
      title="Verify your email"
      subtitle="Please enter the 6-digit code sent to email abdulsalamumoru247@gmail.com"
      linkLabel="Didn't Receive OTP? "
      linkTo="#"
      linkName="Resend in 59s"
      buttonLabel="Verify Email"
      onSubmit={handleSubmit}
    >
      {/* OTP Input */}
      <div className="flex justify-center">
        <CodeInput onChange={setOtp} />
      </div>
    </AuthFormLayout>
  );
}

export default memo(VerifyEmail);
