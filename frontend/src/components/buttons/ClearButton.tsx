import { memo } from "react";
import { Icon } from "@iconify/react";

interface ClearButtonProps {
  onClick: () => void;
  height?: number;
  width?: number;
}

function ClearButton({ onClick, height = 20, width = 20 }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Clear"
      className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-normal/80"
    >
      <Icon icon="solar:close-circle-bold" height={height} width={width} />
    </button>
  );
}

export default memo(ClearButton);
