import { memo } from "react";
import { Icon } from "@iconify/react";
import SubPageLayout from "../../components/layout/SubPageLayout";

function NotificationsPage() {
  return (
    <SubPageLayout title="Notifications" titleSize="sm">
      <div className="flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center rounded-2xl bg-white px-4 text-center">
        <Icon
          icon="solar:bell-off-linear"
          className="h-10 w-10 text-gray-light"
        />
        <p className="mt-4 text-sm font-semibold text-gray-dark">
          You are all caught up
        </p>
        <p className="mt-1 text-xs text-gray-light">
          New updates will appear here.
        </p>
      </div>
    </SubPageLayout>
  );
}

export default memo(NotificationsPage);
