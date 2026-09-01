import React from "react";
import { Icon } from "@iconify/react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-dvh bg-gray-extra-light text-gray-dark flex flex-col font-sans pb-24 md:pb-0 md:pl-64">
      {/* Top Header Navbar */}
      <header className="h-16 w-full bg-white border-b border-gray-lighter flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            U
          </div>
          <div>
            <h2 className="text-sm font-bold leading-tight">Welcome, Chief</h2>
            <p className="text-xs text-gray-normal">
              abdulsalamumoru247@gmail.com
            </p>
          </div>
        </div>

        <button className="h-10 w-10 rounded-full bg-gray-lightest flex items-center justify-center text-gray-semi-dark relative hover:bg-gray-lighter transition-colors">
          <Icon icon="solar:bell-outline" width={22} height={22} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error animate-pulse" />
        </button>
      </header>

      {/* Main Screen Feed Viewport Container */}
      <main className="w-full max-w-4xl mx-auto p-4 space-y-6 flex-1">
        {children}
      </main>

      {/* Responsive Mobile Bottom Navigation Bar Menu */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-lighter flex items-center justify-around px-2 z-40 md:hidden shadow-lg">
        <button className="flex flex-col items-center justify-center gap-1 text-primary">
          <Icon icon="solar:home-smile-angle-bold" width={24} height={24} />
          <span className="text-[11px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-gray-light hover:text-gray-semi-dark transition-colors">
          <Icon icon="solar:wallet-money-outline" width={24} height={24} />
          <span className="text-[11px] font-medium">Wallet</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-gray-light hover:text-gray-semi-dark transition-colors">
          <Icon icon="solar:history-outline" width={24} height={24} />
          <span className="text-[11px] font-medium">History</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-1 text-gray-light hover:text-gray-semi-dark transition-colors">
          <Icon icon="solar:settings-outline" width={24} height={24} />
          <span className="text-[11px] font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
}
