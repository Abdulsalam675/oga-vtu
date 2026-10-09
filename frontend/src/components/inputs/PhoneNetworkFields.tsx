import { memo } from "react";
import { Icon } from "@iconify/react";
import ClearButton from "../buttons/ClearButton";

interface PhoneNetworkFieldsProps {
  phoneNumber: string;
  onPhoneChange: (value: string) => void;
  userPhoneNumber?: string;
  onBuyForSelf?: () => void;
  selectedNetwork?: string;
  selectedNetworkLogo?: string;
  onNetworkClick: () => void;
}

function PhoneNetworkFields({
  phoneNumber,
  onPhoneChange,
  userPhoneNumber = "",
  onBuyForSelf,
  selectedNetwork = "",
  selectedNetworkLogo = "",
  onNetworkClick,
}: PhoneNetworkFieldsProps) {
  const showBuyForSelf = !phoneNumber && userPhoneNumber && onBuyForSelf;

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-gray-dark">
        Enter phone number
      </label>

      <div className="rounded-2xl bg-white px-2.5 py-4">
        <div className="flex items-center gap-1.5 rounded-full border border-transparent bg-gray-extra-light px-2.5 py-1 transition-colors focus-within:border-primary">
          <button
            type="button"
            onClick={onNetworkClick}
            className="flex shrink-0 cursor-pointer items-center gap-1 border-r border-gray-light/40 pr-3"
          >
            {selectedNetworkLogo ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <img
                  src={selectedNetworkLogo}
                  alt={selectedNetwork || "Network"}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <Icon
                icon="solar:global-linear"
                className="h-[22px] w-[22px] shrink-0 text-gray-normal"
              />
            )}
            <Icon
              icon="solar:alt-arrow-down-linear"
              className="h-3.5 w-3.5 text-gray-light"
            />
          </button>

          {/* Phone number */}
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Phone Number"
            value={phoneNumber}
            maxLength={11}
            onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
            className="w-full flex-1 bg-transparent px-2 py-2.5 text-base font-medium text-gray-dark outline-none placeholder:text-gray-light"
          />

          {phoneNumber && <ClearButton onClick={() => onPhoneChange("")} />}
        </div>

        <div
          className={
            "overflow-hidden transition-all duration-250 ease-out " +
            (showBuyForSelf
              ? "mt-4 max-h-10 opacity-100"
              : "mt-0 max-h-0 opacity-0")
          }
        >
          <button
            type="button"
            onClick={onBuyForSelf}
            tabIndex={showBuyForSelf ? 0 : -1}
            className="flex w-full cursor-pointer items-center gap-1.5 pl-1 text-left text-xs"
          >
            <span className="font-semibold text-primary">Buy For Self</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-gray-normal" />
            <span className="font-medium text-gray-semi-dark">
              {userPhoneNumber}
            </span>
            <Icon
              icon="solar:alt-arrow-right-linear"
              className="ml-auto h-4 w-4 shrink-0 text-gray-light"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PhoneNetworkFields);
