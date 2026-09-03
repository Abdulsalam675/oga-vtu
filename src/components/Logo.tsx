// src/components/Logo.tsx
import { memo } from "react";

interface LogoProps {
  color?: "primary" | "white" | "gray-dark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const colorClasses = {
  primary: "text-primary",
  white: "text-white",
  "gray-dark": "text-gray-dark",
};

function Logo({ color = "primary", size = "md", className = "" }: LogoProps) {
  return (
    <span
      className={`inline-block font-semibold tracking-wide ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      Oga
    </span>
  );
}

export default memo(Logo);
