import { Icon } from "@iconify/react";

interface ActionItem {
  icon: string;
  label: string;
  colorClass: string;
}

const actions: ActionItem[] = [
  {
    icon: "solar:phone-calling-outline",
    label: "Airtime",
    colorClass: "text-blue-500 bg-blue-50",
  },
  {
    icon: "solar:globus-outline",
    label: "Data Bundle",
    colorClass: "text-emerald-500 bg-emerald-50",
  },
  {
    icon: "solar:bomb-emoji-outline",
    label: "Cable TV",
    colorClass: "text-purple-500 bg-purple-50",
  },
  {
    icon: "solar:plug-charge-outline",
    label: "Electricity",
    colorClass: "text-amber-500 bg-amber-50",
  },
  {
    icon: "solar:ticket-outline",
    label: "Exam Pin",
    colorClass: "text-rose-500 bg-rose-50",
  },
  {
    icon: "solar:chat-square-line-outline",
    label: "Bulk SMS",
    colorClass: "text-indigo-500 bg-indigo-50",
  },
];

export default function QuickActions() {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-normal px-1">
        Quick Services
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((item, index) => (
          <button
            key={index}
            className="bg-white p-4 rounded-2xl border border-gray-lighter flex flex-col items-center justify-center text-center gap-2.5 transition-all hover:border-primary/20 active:scale-[0.97]"
          >
            <div
              className={`h-12 w-12 rounded-full ${item.colorClass} flex items-center justify-center`}
            >
              <Icon icon={item.icon} width={24} height={24} />
            </div>
            <span className="text-xs font-bold text-gray-dark tracking-tight">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
