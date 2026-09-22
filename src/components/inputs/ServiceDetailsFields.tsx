import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import ClearButton from "../buttons/ClearButton";

export type ServiceOption = {
  id: string;
  name: string;
  logo?: string;
  subtitle?: string;
};

type ServiceDetailsFieldsProps = {
  label: string;
  selectedOption?: ServiceOption | null;
  selectPlaceholder: string;
  inputPlaceholder: string;
  value: string;
  maxLength: number;
  fallbackIcon: string;
  error?: string;
  getOptionLabel?: (option: ServiceOption) => string;
  onSelect: () => void;
  onChange: (value: string) => void;
  beforeFields?: ReactNode;
  children?: ReactNode;
};

function ServiceDetailsFields({
  label,
  selectedOption,
  selectPlaceholder,
  inputPlaceholder,
  value,
  maxLength,
  fallbackIcon,
  error,
  getOptionLabel,
  onSelect,
  onChange,
  beforeFields,
  children,
}: ServiceDetailsFieldsProps) {
  const optionLabel = selectedOption
    ? getOptionLabel?.(selectedOption) || selectedOption.name
    : selectPlaceholder;

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-gray-dark">
        {label}
      </label>

      <div className="space-y-3 rounded-2xl bg-white px-2.5 py-4">
        {beforeFields}

        <button
          type="button"
          onClick={onSelect}
          className="flex w-full cursor-pointer items-center gap-2 rounded-full bg-gray-extra-light px-3 py-1 text-left"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15">
            {selectedOption?.logo ? (
              <img
                src={selectedOption.logo}
                alt={selectedOption.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <Icon icon={fallbackIcon} className="h-4 w-4 text-primary" />
            )}
          </div>
          <span
            className={
              "flex-1 px-1 py-3 text-sm font-medium " +
              (selectedOption ? "text-gray-dark" : "text-gray-light")
            }
          >
            {optionLabel}
          </span>
          <Icon
            icon="solar:alt-arrow-down-linear"
            className="h-5 w-5 shrink-0 text-gray-light"
          />
        </button>

        <div className="flex items-center gap-1.5 rounded-full border border-transparent bg-gray-extra-light px-4 py-1 transition-colors focus-within:border-primary">
          {/* Account number */}
          <input
            type="text"
            inputMode="numeric"
            placeholder={inputPlaceholder}
            value={value}
            maxLength={maxLength}
            onChange={(event) =>
              onChange(event.target.value.replace(/\D/g, ""))
            }
            className="w-full flex-1 bg-transparent px-2 py-2.5 text-base font-medium text-gray-dark outline-none placeholder:text-gray-light"
          />
          {value && <ClearButton onClick={() => onChange("")} />}
        </div>

        {children}
      </div>

      {error && (
        <p className="mt-2 pl-3 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}

export default ServiceDetailsFields;
