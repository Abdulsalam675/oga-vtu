import { memo } from "react";
import { Icon } from "@iconify/react";

interface ClearButtonProps {
  onClick: () => void;
}

function ClearButton({ onClick }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Clear"
      className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-normal/80"
    >
      <Icon icon="solar:close-circle-bold" className="h-6 w-6" />
    </button>
  );
}

export default memo(ClearButton);
