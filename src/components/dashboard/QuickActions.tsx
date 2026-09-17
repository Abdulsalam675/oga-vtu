import { memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { serviceIcons } from "../../constants/serviceIcons";

interface QuickActionsProps {
  profileComplete?: boolean;
  onProfileIncomplete?: () => void;
}

const actions = [
  { id: "transfer", label: "Transfer", icon: serviceIcons.transfer },
  { id: "airtime", label: "Airtime", icon: serviceIcons.airtime },
  { id: "data", label: "Data", icon: serviceIcons.data },
  { id: "electricity", label: "Electricity", icon: serviceIcons.electricity },
  { id: "tv", label: "Cable TV", icon: serviceIcons.tv },
  { id: "more", label: "More", icon: serviceIcons.more },
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
    const paths: Record<string, string> = {
      transfer: "/dashboard/transfer",
      airtime: "/dashboard/airtime",
      data: "/dashboard/data",
      electricity: "/dashboard/electricity",
      tv: "/dashboard/cable-tv",
      more: "/dashboard/services",
    };
    if (paths[id]) navigate(paths[id]);
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
