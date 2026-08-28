import { Icon } from "@iconify/react";
import React, { memo, useState } from "react";

interface AuthInputProps {
  label: string;
  icon: string;
  name: string;
  type: "email" | "password" | "text";
  placeholder: string;
  value: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  error?: string;
}

function AuthInput({
  label,
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  isPassword = false,
  error,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const inputId = `auth-input-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const shouldShowError = !!error;

  const wrapperBorderClass = shouldShowError
    ? "border-[color:var(--error)]"
    : "border-gray-300 focus-within:border-[color:var(--primary)]";

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-semibold text-gray-700 pl-3"
      >
        {label}
      </label>

      <div
        className={`input-wrapper flex items-center gap-3 border transition-colors ${wrapperBorderClass}`}
      >
        <Icon
          icon={icon}
          width={20}
          height={20}
          className="muted-text"
          aria-hidden="true"
        />

        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={value}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          className="bg-transparent w-full focus:outline-none text-sm font-medium py-4"
        />
        {isPassword && (
          <button
            type="button"
            className="muted-text hover:opacity-80 focus:outline-none"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off-outline" : "solar:eye-outline"}
              width={20}
              height={20}
              className="muted-text hover:opacity-80 transition-colors"
              aria-hidden="true"
            />
          </button>
        )}
      </div>
      {shouldShowError && (
        <p className="mt-1 text-xs text-red-500 font-medium pl-3 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}

export default memo(AuthInput);
