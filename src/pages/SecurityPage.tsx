import { memo } from "react";
import SubPageLayout from "../components/layout/SubPageLayout";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
function SecurityPage() {
  const navigate = useNavigate();
  const menuItems = [
    {
      id: "password",
      label: "Change password",
      subtitle: "Update your login password",
      icon: "solar:lock-password-linear",
      onClick: () => {
        navigate("/dashboard/profile/security/change-password");
      },
    },
    {
      id: "pin",
      label: "Change PIN",
      subtitle: "Change transaction PIN",
      icon: "solar:key-minimalistic-linear",
      onClick: () => {
        navigate("/dashboard/profile/security/change-pin");
      },
    },
  ];

  return (
    <SubPageLayout title="Security">
      <section>
        <h3 className="mb-4 mt-10 text-sm font-semibold text-gray-dark">
          Account Protection
        </h3>

        <ul className="space-y-3">
          {menuItems.map(function (item) {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={item.onClick}
                  className="flex w-full items-center gap-3.5 rounded-xl bg-white px-4 py-4 text-left transition-colors active:bg-gray-lightest"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon icon={item.icon} className="h-5 w-5 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-dark">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-light">
                      {item.subtitle}
                    </p>
                  </div>

                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="h-5 w-5 shrink-0 text-gray-light"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </SubPageLayout>
  );
}

export default memo(SecurityPage);
