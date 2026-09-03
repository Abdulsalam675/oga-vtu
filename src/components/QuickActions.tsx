// src/components/dashboard/QuickActions.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";

interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

interface QuickActionsProps {
  onActionClick?: (id: string) => void;
}

const actions: QuickAction[] = [
  {
    id: "airtime",
    label: "Airtime",
    icon: "solar:phone-calling-linear",
  },
  {
    id: "data",
    label: "Data",
    icon: "solar:smartphone-linear",
  },
  {
    id: "electricity",
    label: "Electricity",
    icon: "solar:lightbulb-bolt-linear",
  },
  {
    id: "tv",
    label: "Cable TV",
    icon: "solar:tv-linear",
  },
  {
    id: "exam",
    label: "Exam Pin",
    icon: "solar:document-linear",
  },
  {
    id: "more",
    label: "More",
    icon: "solar:widget-2-linear",
  },
];

function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <section className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-dark">Services</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {actions.map(function (action) {
          return (
            <button
              key={action.id}
              type="button"
              onClick={function () {
                if (onActionClick) onActionClick(action.id);
              }}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl bg-white p-3 transition-opacity hover:opacity-70 active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl">
                <Icon icon={action.icon} className="h-6 w-6 text-gray-dark" />
              </div>
              <span className="text-[10px] font-semibold text-gray-dark">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default memo(QuickActions);
