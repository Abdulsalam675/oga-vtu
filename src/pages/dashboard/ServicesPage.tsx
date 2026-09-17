import { memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { serviceIcons } from "../../constants/serviceIcons";

const services = [
  {
    id: "transfer",
    label: "Transfer",
    icon: serviceIcons.transfer,
    path: "/dashboard/transfer",
  },
  {
    id: "airtime",
    label: "Airtime",
    icon: serviceIcons.airtime,
    path: "/dashboard/airtime",
  },
  {
    id: "data",
    label: "Data",
    icon: serviceIcons.data,
    path: "/dashboard/data",
  },
  {
    id: "electricity",
    label: "Electricity",
    icon: serviceIcons.electricity,
    path: "/dashboard/electricity",
  },
  {
    id: "tv",
    label: "Cable TV",
    icon: serviceIcons.tv,
    path: "/dashboard/cable-tv",
  },
  {
    id: "betting",
    label: "Betting",
    icon: "solar:football-linear",
    path: "",
  },
  {
    id: "exam-pin",
    label: "Exam PIN",
    icon: "solar:notebook-linear",
    path: "",
  },
  {
    id: "internet",
    label: "Internet",
    icon: "solar:wi-fi-router-linear",
    path: "",
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: "solar:shield-check-linear",
    path: "",
  },
  {
    id: "recharge-card",
    label: "Recharge Card",
    icon: "solar:ticket-sale-linear",
    path: "",
  },
  {
    id: "water",
    label: "Water",
    icon: "solar:waterdrops-linear",
    path: "",
  },
  {
    id: "bulk-sms",
    label: "Bulk SMS",
    icon: "solar:letter-linear",
    path: "",
  },
  {
    id: "gift-card",
    label: "Gift Cards",
    icon: "solar:gift-linear",
    path: "",
  },
] as const;

function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h1 className="text-center text-xl font-extrabold tracking-tight text-gray-dark">
          Services
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {services.map((service) => {
          const isAvailable = service.path !== "";

          return (
            <button
              key={service.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => {
                if (isAvailable) navigate(service.path);
              }}
              className="relative flex cursor-pointer flex-col items-center gap-1 rounded-2xl bg-white p-3 transition-opacity active:scale-95 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {!isAvailable && (
                <span className="absolute right-1.5 top-1.5 rounded bg-gray-lighter px-1 py-0.5 text-[7px] font-bold text-gray-semi-dark uppercase tracking-wider scale-90">
                  Soon
                </span>
              )}

              <div className="flex h-8 w-8 items-center justify-center rounded-xl">
                <Icon icon={service.icon} className="h-6 w-6 text-gray-dark" />
              </div>
              <span className="text-[10px] font-bold text-gray-dark">
                {service.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ServicesPage);
