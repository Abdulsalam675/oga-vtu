// src/components/SplitScreenLayout.tsx
import { memo } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen w-full flex items-stretch select-none text-gray-800 antialiased overflow-hidden">
      {/* LEFT CONTAINER*/}
      <div className="hidden md:flex md:w-[40%] flex-col justify-between p-14 sticky top-0 h-screen text-white overflow-hidden antialiased relative bg-gradient-to-b from-[#10b981] via-[#059669] to-[#064e3b]">
        <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-white/[0.08] blur-[100px] pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-400/10 blur-[90px] pointer-events-none" />

        {/* Top Header (LOGO)*/}
        <header className="relative z-20 flex items-center gap-3">
          <span
            style={{ fontFamily: "var(--font-accent)" }}
            className="text-2xl font-black text-white tracking-tight block drop-shadow-sm"
          >
            Oga
          </span>
        </header>

        <div className="flex-1 flex flex-col justify-center items-start relative z-20 max-w-xs pl-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-200/60 uppercase mb-2 block">
            VIRTUAL GATEWAY
          </span>

          <div className="h-[2px] w-6 bg-white/50 rounded-full mb-4 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />

          <h2 className="text-xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
            Automated Utility & Transaction Network.
          </h2>

          <p className="text-xs text-emerald-50/70 font-light mt-3 leading-relaxed">
            Instant airtime top-ups, automated data delivery, and zero-delay
            utility clearing modules.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 opacity-60 text-[10px] font-semibold tracking-wider">
            <span className="flex items-center gap-1">✦ 99.9% Uptime</span>
            <span className="flex items-center gap-1">
              ✦ End-to-End Encryption
            </span>
          </div>
        </div>

        <footer className="relative z-20 border-t border-white/10 pt-4 flex items-center justify-between">
          <p className="text-[10px] text-emerald-100/40 font-bold tracking-[0.15em] uppercase">
            &copy; {new Date().getFullYear()} Oga Inc.
          </p>
          <span className="text-[9px] font-bold tracking-widest text-emerald-200/30 uppercase">
            SECURE ENVIRONMENT
          </span>
        </footer>
      </div>

      {/* RIGHT CONTAINER */}
      <section className="w-full md:w-[60%] flex flex-col justify-start md:justify-center items-center pt-6 md:pt-0 p-4 sm:p-16 bg-white relative z-30 shadow-2xl">
        <div className="w-full max-w-md">
          {/* Mobile Brand Asset */}
          <div className="mb-10 text-left md:hidden">
            <span
              style={{
                fontFamily: "var(--font-accent)",
                color: "var(--primary)",
              }}
              className="text-2xl font-bold tracking-wide inline-block"
            >
              Oga
            </span>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2 mb-10 text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-950">
              {right.title}
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">
              {right.subtitle}
            </p>
          </div>

          {/* Form passed down as component children */}
          <div className="space-y-4">{children}</div>

          {/* Navigation rerouting links */}
          <p className="mt-8 text-sm text-gray-500 text-center font-semibold">
            {link.label}{" "}
            <Link
              to={link.to}
              className="underline underline-offset-3 hover:opacity-75 transition-opacity"
              style={{ color: "#10b981" }}
            >
              {link.linkName}
            </Link>
          </p>

          {/* Supplemental Footer */}
          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </section>
    </div>
  );
}

export default memo(SplitScreenLayout);
