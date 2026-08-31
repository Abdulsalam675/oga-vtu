import { Icon } from "@iconify/react";
import { memo } from "react";

interface AuthButtonProps {
  icon: string;
  label: string;
  color?: string;
  onClick: () => void;
}

function AuthButton({ icon, label, color, onClick }: AuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 px-6 rounded-full btn-secondary hover:opacity-95 transition-colors cursor-pointer text-gray-normal"
    >
      <Icon
        icon={icon}
        width={22}
        height={22}
        className={color}
        aria-hidden="true"
      />
      <span
        className={`text-sm font-semibold tracking-wide ${color ? color : "text-gray-dark"}`}
      >
        {label}
      </span>
      <span className="w-5" aria-hidden="true"></span>
    </button>
  );
}

export default memo(AuthButton);
