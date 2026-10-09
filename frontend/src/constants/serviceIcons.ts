export const serviceIcons = {
  transfer: "solar:transfer-horizontal-linear",
  airtime: "solar:phone-linear",
  data: "solar:smartphone-linear",
  electricity: "solar:lightbulb-bolt-linear",
  tv: "solar:tv-linear",
  more: "solar:widget-2-linear",
  wallet: "solar:wallet-money-linear",
} as const;

export type ServiceId = keyof typeof serviceIcons;
