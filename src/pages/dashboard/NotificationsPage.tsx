import { memo } from "react";
import { Icon } from "@iconify/react";
import SubPageLayout from "../../components/layout/SubPageLayout";

type NotificationType = "success" | "info" | "warning";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  unread: boolean;
};

const demoNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Airtime purchase successful",
    message: "Your MTN Airtime purchase of ₦500 was successful.",
    time: "10:24 AM",
    type: "success",
    unread: true,
  },
  {
    id: "2",
    title: "Complete your profile",
    message: "Add your phone number to unlock all OGA services.",
    time: "Yesterday",
    type: "info",
    unread: true,
  },
  {
    id: "3",
    title: "Electricity payment pending",
    message: "Your IKEDC payment is being processed.",
    time: "Yesterday",
    type: "warning",
    unread: false,
  },
  {
    id: "4",
    title: "Welcome to OGA",
    message: "Your account is ready. You can now pay bills and buy data.",
    time: "This week",
    type: "info",
    unread: false,
  },
];

const notificationIcon: Record<NotificationType, string> = {
  success: "solar:check-circle-bold",
  info: "solar:info-circle-bold",
  warning: "solar:clock-circle-bold",
};

const notificationColor: Record<NotificationType, string> = {
  success: "text-emerald-600 bg-emerald-50",
  info: "text-gray-dark bg-gray-extra-light",
  warning: "text-amber-600 bg-amber-50",
};

function NotificationsPage() {
  return (
    <SubPageLayout title="Notifications" titleSize="sm">
      <div className="space-y-3">
        {demoNotifications.length === 0 ? (
          <div className="rounded-2xl bg-white px-4 py-12 text-center">
            <Icon
              icon="solar:bell-off-linear"
              className="mx-auto h-8 w-8 text-gray-light"
            />
            <p className="mt-3 text-sm font-semibold text-gray-dark">
              You are all caught up
            </p>
            <p className="mt-1 text-xs text-gray-light">
              New updates will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white">
            {demoNotifications.map(function (notification, index) {
              return (
                <article
                  key={notification.id}
                  className={
                    "flex gap-3 px-4 py-4 " +
                    (index !== demoNotifications.length - 1
                      ? "border-b border-gray-lightest"
                      : "")
                  }
                >
                  <div
                    className={
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full " +
                      notificationColor[notification.type]
                    }
                  >
                    <Icon
                      icon={notificationIcon[notification.type]}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-dark">
                        {notification.title}
                      </p>
                      {notification.unread && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-error" />
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-gray-light">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-[11px] font-medium text-gray-light">
                      {notification.time}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}

export default memo(NotificationsPage);
