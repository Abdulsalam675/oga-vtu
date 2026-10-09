import { memo, type ReactNode } from "react";

interface PlanCardProps {
  onClick: () => void;
  children: ReactNode;
}

function PlanCard({ onClick, children }: PlanCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex cursor-pointer flex-col justify-between rounded-2xl bg-white p-3.5 text-left transition-colors active:bg-gray-lightest"
    >
      {children}
    </button>
  );
}

export default memo(PlanCard);
