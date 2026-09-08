// src/components/layout/DashboardLayout.tsx
import { memo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomNav from "../BottomNav";
import { getUserData, type UserData } from "../../utilities/userStorage";

function DashboardLayout() {
  const [user, setUser] = useState<UserData | null>(() => getUserData());
  const navigate = useNavigate();

  if (!user?.isLoggedIn) {
    navigate("/signin");
  }

  return (
    <div className="min-h-dvh w-full bg-gray-extra-light text-gray-dark antialiased">
      <main className="px-4 py-5 pb-24">
        <Outlet context={{ user, setUser }} />
      </main>
      <BottomNav />
    </div>
  );
}

export default memo(DashboardLayout);
