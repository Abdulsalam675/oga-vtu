import { memo } from "react";

interface ButtonProps {
  label: string;
  type?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  htmlType: "button" | "submit" | "reset";
  onClick?: () => void;
}

function Button({
  label,
  type = "primary",
  disabled = false,
  loading = false,
  htmlType,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "w-full py-4 px-6 rounded-full font-semibold text-sm tracking-wide transition-colors";

  const variantClass = type === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variantClass} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
      {loading ? "Loading..." : label}
    </button>
  );
}

export default memo(Button);
