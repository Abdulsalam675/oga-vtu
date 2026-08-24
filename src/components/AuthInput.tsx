import { Icon } from "@iconify/react";
import { memo, useState } from "react";

interface AuthInputProps {
  label: string;
  icon: string;
  type: "email" | "password" | "text";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isPassword?: boolean;
}

function AuthInput({
  label,
  icon,
  type,
  placeholder,
  value,
  onChange,
  isPassword = false,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const inputId = `auth-input-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-semibold text-gray-700 pl-3"
      >
        {label}
      </label>
      <div className="input-wrapper flex items-center gap-3 focus-within:outline-1 transition-color focus-within:outline-[color:var(--primary)]">
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
          onChange={(e) => onChange(e.target.value)}
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
    </div>
  );
}

export default memo(AuthInput);
