// src/components/dashboard/Header.tsx
import { memo } from "react";
import { Icon } from "@iconify/react";

interface HeaderProps {
  firstName?: string;
  profileComplete?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

function Header({
  firstName,
  profileComplete = false,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
}: HeaderProps) {
  const displayName = profileComplete && firstName ? firstName : "there";
  const initials =
    profileComplete && firstName ? firstName.charAt(0).toUpperCase() : "";

  return (
    <header className="sticky top-0 z-20 bg-gray-lightest">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Left: Avatar + Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="Profile"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {initials}
          </button>

          {/* Greeting */}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-dark md:text-base">
              Hi, {displayName}
            </p>
          </div>
        </div>

        {/* Right: Notifications */}
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="Notifications"
          className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-normal transition-colors hover:bg-gray-lighter"
        >
          <Icon icon="solar:bell-linear" className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
          )}
        </button>
      </div>
    </header>
  );
}

export default memo(Header);
