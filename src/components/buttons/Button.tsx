import { memo } from "react";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  htmlType: "button" | "submit" | "reset";
  onClick?: () => void;
}

function Button({
  label,
  disabled = false,
  loading = false,
  htmlType,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "w-full py-4 px-6 rounded-full font-semibold text-sm tracking-wide transition-colors bg-primary text-white hover:bg-primary-dark flex align-center justify-center";

  return (
    <button
      type={htmlType}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {loading ? <Spinner /> : label}
    </button>
  );
}

function Spinner() {
  return (
    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
  );
}

export default memo(Button);
