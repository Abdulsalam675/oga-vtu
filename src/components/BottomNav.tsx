// src/components/dashboard/BottomNav.tsx
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

const navItems = [
  {
    to: "/dashboard",
    label: "Home",
    icon: "solar:home-2-linear",
    iconActive: "solar:home-2-bold",
    end: true,
  },
  {
    to: "/dashboard/services",
    label: "Services",
    icon: "solar:widget-2-linear",
    iconActive: "solar:widget-2-bold",
    end: false,
  },
  {
    to: "/dashboard/history",
    label: "History",
    icon: "solar:history-linear",
    iconActive: "solar:history-bold",
    end: false,
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: "solar:user-circle-linear",
    iconActive: "solar:user-circle-bold",
    end: false,
  },
];

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 bg-white md:hidden border-t border-gray-lightest shadow-xs"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex h-16 items-stretch">
        {navItems.map(function (item) {
          return (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                end={item.end}
                className="flex h-full w-full flex-col items-center justify-center gap-0.5"
              >
                {function ({ isActive }) {
                  return (
                    <>
                      <Icon
                        icon={isActive ? item.iconActive : item.icon}
                        className={
                          "h-6 w-6 " +
                          (isActive ? "text-primary" : "text-gray-light")
                        }
                      />
                      <span
                        className={
                          "text-[11px] font-medium " +
                          (isActive ? "text-primary" : "text-gray-light")
                        }
                      >
                        {item.label}
                      </span>
                    </>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default memo(BottomNav);
