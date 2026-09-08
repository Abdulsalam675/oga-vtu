// src/components/dashboard/QuickActions.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

interface QuickActionsProps {
  profileComplete?: boolean;
  onProfileIncomplete?: () => void;
}

const actions: QuickAction[] = [
  {
    id: "transfer",
    label: "Transfer",
    icon: "solar:transfer-horizontal-linear",
  },
  {
    id: "airtime",
    label: "Airtime",
    icon: "solar:phone-linear",
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
    id: "more",
    label: "More",
    icon: "solar:widget-2-linear",
  },
];

function QuickActions({
  profileComplete = false,
  onProfileIncomplete,
}: QuickActionsProps) {
  const navigate = useNavigate();

  function handleActionClick(id: string) {
    if (!profileComplete) {
      onProfileIncomplete?.();
      return;
    }

    switch (id) {
      case "transfer":
        navigate("/dashboard/transfer");
        break;
      case "airtime":
        navigate("/dashboard/airtime");
        break;
      case "data":
        navigate("/dashboard/data");
        break;
      case "electricity":
        navigate("/dashboard/electricity");
        break;
      case "tv":
        navigate("/dashboard/cable-tv");
        break;
      case "more":
        navigate("/dashboard/more-services");
        break;
      default:
        break;
    }
  }

  return (
    <section className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-dark">Services</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {actions.map(function (action) {
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action.id)}
              className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl bg-white p-3 transition-opacity active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl">
                <Icon icon={action.icon} className="h-6 w-6 text-gray-dark" />
              </div>
              <span className="text-[10px] font-bold text-gray-dark">
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
