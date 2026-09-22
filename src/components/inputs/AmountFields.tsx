import ClearButton from "../buttons/ClearButton";

type AmountFieldsProps = {
  amount: string;
  onAmountChange: (value: string) => void;
  presetAmounts?: number[];
  placeholder?: string;
  onPresetClick?: (value: number) => void;
  presetContainerClassName?: string;
  presetButtonClassName?: string;
  presetDisabled?: boolean;
  presetTabIndex?: number;
  error?: string;
};

function formatAmount(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  if (!digitsOnly) return "";
  return Number(digitsOnly).toLocaleString("en-NG");
}

function AmountFields({
  amount,
  onAmountChange,
  presetAmounts = [],
  placeholder = "0.00",
  onPresetClick,
  presetContainerClassName = "mt-5 grid grid-cols-3 gap-3",
  presetButtonClassName = "cursor-pointer rounded-lg bg-gray-extra-light px-2 py-5 text-sm font-medium text-gray-dark active:bg-gray-lightest",
  presetDisabled = false,
  presetTabIndex,
  error,
}: AmountFieldsProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-gray-dark">
        Amount
      </label>
      <div className="rounded-2xl bg-white px-2.5 py-4">
        <div className="flex items-center gap-1 rounded-full border border-transparent bg-gray-extra-light px-4 py-1 transition-colors focus-within:border-primary">
          <span className="border-r border-gray-light/40 pr-2 text-lg font-extrabold text-gray-dark">
            ₦
          </span>
          {/* Amount */}
          <input
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            value={formatAmount(amount)}
            onChange={(event) =>
              onAmountChange(event.target.value.replace(/\D/g, ""))
            }
            className="w-full flex-1 bg-transparent px-1 py-2.5 text-base font-medium text-gray-normal outline-none placeholder:text-gray-light"
          />
          {amount && <ClearButton onClick={() => onAmountChange("")} />}
        </div>

        {error && (
          <p className="mt-2 px-1 text-xs font-medium text-error">{error}</p>
        )}

        {presetAmounts.length > 0 && onPresetClick && (
          <div className={presetContainerClassName}>
            {presetAmounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onPresetClick(value)}
                disabled={presetDisabled}
                tabIndex={presetTabIndex}
                className={presetButtonClassName}
              >
                ₦{value.toLocaleString("en-NG")}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AmountFields;
