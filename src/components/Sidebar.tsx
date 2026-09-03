// src/components/dashboard/Sidebar.tsx
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "./Logo";

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

function Sidebar() {
  return (
    <aside className="hidden h-dvh w-64 shrink-0 flex-col border-r border-gray-lighter bg-white md:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-gray-lighter px-6 py-5">
        <Logo color="primary" size="md" />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(function (item) {
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className="block rounded-xl transition-colors"
                >
                  {function ({ isActive }) {
                    return (
                      <div
                        className={
                          "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors " +
                          (isActive
                            ? "bg-primary/10 text-primary"
                            : "text-gray-semi-dark hover:bg-gray-extra-light")
                        }
                      >
                        <Icon
                          icon={isActive ? item.iconActive : item.icon}
                          className="h-5 w-5 shrink-0"
                        />
                        <span className="text-sm font-semibold">
                          {item.label}
                        </span>
                      </div>
                    );
                  }}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer note */}
      <div className="border-t border-gray-lighter px-6 py-4">
        <p className="text-[11px] font-medium text-gray-light">
          © {new Date().getFullYear()} Oga
        </p>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
