// src/components/SplitScreenLayout.tsx
import { memo } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

interface SplitScreenLayoutProps {
  children: ReactNode;
  right: {
    title: string;
    subtitle: string;
  };
  link: {
    label: string;
    to: string;
    linkName: string;
  };
  footer?: ReactNode;
}

function SplitScreenLayout({
  children,
  right,
  link,
  footer,
}: SplitScreenLayoutProps) {
  return (
    <div className="min-h-dvh w-full flex items-stretch select-none text-gray-dark antialiased">
      {/* LEFT PANEL — desktop only */}
      <div className="relative hidden md:flex md:w-[40%] h-dvh sticky top-0 flex-col justify-between overflow-hidden p-14 text-white bg-gradient-to-b from-primary via-[#059669] to-[#064e3b]">
        <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[450px] w-[450px] rounded-full bg-white/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[350px] w-[350px] rounded-full bg-emerald-400/10 blur-[90px]" />

        <header className="relative z-20 flex items-center gap-3">
          <Logo color="white" size="md" className="font-black drop-shadow-sm" />
        </header>

        <div className="relative z-20 flex max-w-xs flex-1 flex-col items-start justify-center pl-2">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-200/60">
            VIRTUAL GATEWAY
          </span>

          <div className="mb-4 h-[2px] w-6 rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />

          <h2 className="text-xl font-bold leading-snug tracking-tight text-white drop-shadow-sm">
            Automated Utility & Transaction Network.
          </h2>

          <p className="mt-3 text-xs font-light leading-relaxed text-emerald-47/70">
            Instant airtime top-ups, automated data delivery, and zero-delay
            utility clearing modules.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold tracking-wider opacity-60">
            <span className="flex items-center gap-1">✦ 99.9% Uptime</span>
            <span className="flex items-center gap-1">
              ✦ End-to-End Encryption
            </span>
          </div>
        </div>

        <footer className="relative z-20 flex items-center justify-between border-t border-white/10 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-100/40">
            &copy; {new Date().getFullYear()} Oga Inc.
          </p>
          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-200/30">
            SECURE ENVIRONMENT
          </span>
        </footer>
      </div>

      {/* RIGHT PANEL */}
      <section className="relative z-30 flex w-full min-h-dvh flex-col items-center justify-start bg-white p-4 pt-6 shadow-2xl sm:p-10 md:w-[60%] md:justify-center md:pt-0 md:p-16">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 text-left md:hidden">
            <Logo color="primary" size="md" />
          </div>

          <div className="mb-8 space-y-2 text-left">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-dark md:text-3xl">
              {right.title}
            </h1>
            <p className="text-base leading-relaxed text-gray-semi-dark">
              {right.subtitle}
            </p>
          </div>

          <div className="space-y-4">{children}</div>

          <p className="mt-8 text-center text-sm font-medium text-gray-semi-dark">
            {link.label}{" "}
            <Link
              to={link.to}
              className="text-primary underline underline-offset-3 transition-opacity hover:opacity-75"
            >
              {link.linkName}
            </Link>
          </p>

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </section>
    </div>
  );
}

export default memo(SplitScreenLayout);
