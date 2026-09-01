import { Icon } from "@iconify/react";

export default function CompleteProfileModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-dark/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl border border-gray-lighter space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-dark tracking-tight">
            Complete Your Profile
          </h2>
          <p className="mt-1 text-sm text-gray-normal leading-relaxed">
            Provide your details below to activate your electronic wallet
            account and unlock your dashboard.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Custom Input Wrapper 1: Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-semi-dark uppercase tracking-wider">
              Username
            </label>
            <div className="flex items-center gap-3 border border-gray-lighter bg-gray-extra-light px-4 rounded-full">
              <Icon
                icon="solar:user-outline"
                width={20}
                height={20}
                className="text-gray-light"
              />
              <input
                type="text"
                placeholder="e.g., as_dev"
                className="bg-transparent w-full focus:outline-none text-sm font-medium py-3.5 placeholder-gray-light text-gray-dark"
              />
            </div>
          </div>

          {/* Custom Input Wrapper 2: Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-semi-dark uppercase tracking-wider">
              Full Name
            </label>
            <div className="flex items-center gap-3 border border-gray-lighter bg-gray-extra-light px-4 rounded-full">
              <Icon
                icon="solar:text-field-outline"
                width={20}
                height={20}
                className="text-gray-light"
              />
              <input
                type="text"
                placeholder="Abdulsalam Umoru"
                className="bg-transparent w-full focus:outline-none text-sm font-medium py-3.5 placeholder-gray-light text-gray-dark"
              />
            </div>
          </div>

          {/* Custom Input Wrapper 3: Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-semi-dark uppercase tracking-wider">
              Phone Number
            </label>
            <div className="flex items-center gap-3 border border-gray-lighter bg-gray-extra-light px-4 rounded-full">
              <Icon
                icon="solar:phone-outline"
                width={20}
                height={20}
                className="text-gray-light"
              />
              <input
                type="tel"
                inputMode="numeric"
                placeholder="e.g., 08012345678"
                className="bg-transparent w-full focus:outline-none text-sm font-medium py-3.5 placeholder-gray-light text-gray-dark"
              />
            </div>
          </div>

          {/* Save Action Trigger Button */}
          <button
            type="submit"
            className="w-full h-12 mt-2 font-bold text-white bg-primary rounded-full hover:bg-primary-dark transition-colors active:scale-[0.99]"
          >
            Save & Launch Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
