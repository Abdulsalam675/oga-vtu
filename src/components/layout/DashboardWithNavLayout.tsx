import { memo } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import BottomNav from "../dashboard/BottomNav";

function DashboardWithNavLayout() {
  const context = useOutletContext();

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 pb-20">
        <Outlet context={context} />
      </div>
      <BottomNav />
    </div>
  );
}

export default memo(DashboardWithNavLayout);
