import { memo } from "react";
import { Icon } from "@iconify/react";
import Modal from "../layout/Modal";

export type SelectOption = {
  id: string;
  name: string;
  logo?: string;
  subtitle?: string;
};

interface SelectOptionModalProps {
  open: boolean;
  options: SelectOption[];
  selectedId?: string;
  onClose: () => void;
  onSelect: (item: SelectOption) => void;
  title?: string;
  fallbackIcon?: string;
}

function SelectOptionModal({
  open,
  options,
  selectedId = "",
  onClose,
  onSelect,
  title = "Select option",
  fallbackIcon = "solar:global-linear",
}: SelectOptionModalProps) {
  return (
    <Modal open={open} onClose={onClose} showDash={false}>
      <div>
        <h3 className="mb-4 text-lg font-semibold tracking-tight text-gray-dark">
          {title}
        </h3>

        <ul className="max-h-[55dvh] overflow-y-auto overscroll-contain scrollbar-none rounded-2xl">
          {options.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Icon
                        icon={fallbackIcon}
                        className="h-5 w-5 text-primary"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-dark">
                      {item.name}
                    </span>
                    {item.subtitle && (
                      <span className="mt-0.5 block text-xs text-gray-light">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  {isSelected ? (
                    <Icon
                      icon="solar:check-circle-bold"
                      className="h-5 w-5 shrink-0 text-primary"
                    />
                  ) : (
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      className="h-5 w-5 shrink-0 text-gray-light"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
}

export default memo(SelectOptionModal);
