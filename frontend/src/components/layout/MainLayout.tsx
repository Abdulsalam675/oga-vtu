import { memo, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { TransactionsProvider } from "../../context/TransactionsContext";

function MainLayout() {
  const { user } = useUser();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoadingUser(false);
    }, 2000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!user?.isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-gray-extra-light text-gray-dark antialiased">
      <TransactionsProvider isLoading={isLoadingUser}>
        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <Outlet context={{ isLoadingUser }} />
        </main>
      </TransactionsProvider>
    </div>
  );
}

export default memo(MainLayout);
