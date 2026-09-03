// src/components/dashboard/DashboardLayout.tsx
import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import BottomNav from "../BottomNav";
import Sidebar from "../Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-dvh w-full bg-gray-extra-light text-gray-dark antialiased">
      <div className="mx-auto flex min-h-dvh w-full max-w-[1400px]">
        <Sidebar />

        <div className="flex min-h-dvh min-w-0 flex-1 flex-col bg-gray-extra-lightest">
          <Header
            firstName="Abdulsalam"
            profileComplete={true}
            notificationCount={10}
            onNotificationClick={function () {}}
            onProfileClick={function () {}}
          />

          <main className="flex-1 overflow-y-auto px-4 py-5 pb-24 md:px-6 md:pb-8 bg-gray-lightest">
            <Outlet />
          </main>

          <BottomNav />
        </div>
      </div>
    </div>
  );
}

export default memo(DashboardLayout);
