import { memo } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

interface HeaderProps {
  firstName?: string;
  profilePicture?: string;
  profileComplete?: boolean;
  notificationCount?: number;
}

function Header({
  firstName,
  profilePicture,
  profileComplete = false,
  notificationCount = 0,
}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-gray-extra-light">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div onClick={() => navigate("/dashboard/profile")}>
            <Avatar
              size="sm"
              name={firstName}
              profilePicture={profilePicture}
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-extrabold text-gray-dark">
              Hi, {firstName || "there"}
            </p>
            <p className="text-xs text-gray-light">
              {profileComplete ? "Welcome back" : "Complete your profile"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/notifications")}
          aria-label="Notifications"
          className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-dark transition-colors active:bg-gray-lightest"
        >
          <Icon icon="solar:bell-linear" className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-error" />
          )}
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
