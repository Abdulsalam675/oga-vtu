import { Icon } from "@iconify/react";
import React, { memo, useState } from "react";

interface AuthInputProps {
  label: string;
  icon?: string;
  name: string;
  type: "email" | "password" | "text" | "tel";
  placeholder?: string;
  readOnly?: boolean;
  backgroundColor?: string;
  value: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  error?: string;
}

function AuthInput({
  label,
  icon = "",
  type,
  name,
  placeholder,
  readOnly = false,
  value,
  maxLength,
  inputMode,
  onChange,
  onBlur,
  isPassword = false,
  error,
  backgroundColor = "bg-gray-extra-light",
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const inputId = `auth-input-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  let borderClass = "border-transparent focus-within:border-primary";
  if (error) {
    borderClass = "border-error";
  } else if (readOnly) {
    borderClass = "border-transparent";
  }

  return (
    <div className="w-full">
      {/* Input Label */}
      <label
        htmlFor={inputId}
        className={`mb-1 block text-sm font-medium pl-3 ${error ? "text-error" : "text-gray-semi-dark"}`}
      >
        {label}
      </label>

      {/* Input Wrapper Container */}
      <div
        className={`flex items-center border transition-colors px-4 py-1 gap-1 rounded-full ${borderClass} ${backgroundColor}`}
      >
        {icon && (
          <Icon
            icon={icon}
            width={22}
            height={22}
            className="text-gray-normal shrink-0"
            aria-hidden="true"
          />
        )}

        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={value}
          name={name}
          readOnly={readOnly}
          maxLength={maxLength}
          inputMode={inputMode}
          onBlur={onBlur}
          onChange={onChange}
          className={`bg-transparent w-full focus:outline-none text-sm font-medium py-2.5 px-2 placeholder-gray-light ${readOnly ? "text-gray-normal" : "text-gray-semi-dark"}`}
        />

        {/* Toggle Password Visibility Button */}
        {isPassword && !readOnly && (
          <button
            type="button"
            className="text-gray-light hover:opacity-80 focus:outline-none shrink-0"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off-outline" : "solar:eye-outline"}
              width={22}
              height={22}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {/* Field Level Error Message */}
      {error && (
        <p className="mt-1 text-xs text-error font-medium pl-3 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}

export default memo(AuthInput);
