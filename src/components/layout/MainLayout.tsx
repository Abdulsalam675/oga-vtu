import { memo, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData, type UserData } from "../../utilities/userStorage";

function MainLayout() {
  const [user, setUser] = useState<UserData | null>(() => getUserData());

  if (!user?.isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-gray-extra-light text-gray-dark antialiased">
      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        <Outlet context={{ user, setUser }} />
      </main>
    </div>
  );
}

export default memo(MainLayout);
