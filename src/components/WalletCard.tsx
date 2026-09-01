import { Icon } from "@iconify/react";

export default function WalletCard() {
  return (
    <div className="w-full bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl text-white shadow-xl shadow-primary/10 relative overflow-hidden">
      {/* Background Decorative Mesh Shapes */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
      <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-black/10 blur-md pointer-events-none" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-white/80">
            Available Balance
          </span>
          <button className="text-white/80 hover:text-white transition-colors focus:outline-none">
            <Icon icon="solar:eye-outline" width={20} height={20} />
          </button>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold">₦</span>
          <h1 className="text-3xl font-black tracking-tight">5,750.00</h1>
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button className="flex-1 h-12 rounded-full bg-white text-primary font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] hover:bg-gray-extra-light">
            <Icon icon="solar:add-circle-outline" width={18} height={18} />
            Fund Wallet
          </button>
          <button className="flex-1 h-12 rounded-full bg-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 backdrop-blur-sm transition-transform active:scale-[0.98] hover:bg-white/20">
            <Icon icon="solar:arrow-right-up-outline" width={18} height={18} />
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
