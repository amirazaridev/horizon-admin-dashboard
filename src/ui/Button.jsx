import { useNavigate } from "react-router";

const VARIANTS = {
  primary: {
    base: "inline-flex items-center justify-center gap-2 rounded-[12px] border-0 px-5 py-3 font-semibold text-white cursor-pointer transition-all duration-150",
    bg: "bg-gradient-to-br from-[var(--color-primary,#3f27c7)] to-[var(--color-soft,#5b3fe0)]",
    hover: "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(63,39,199,.7)]",
    active: "active:translate-y-0",
  },
  primaryF: {
    base: "flex items-center justify-center gap-2 w-full rounded-[12px] border-0 px-5 py-3 font-semibold text-white cursor-pointer transition-all duration-150",
    bg: "bg-gradient-to-br from-[var(--color-primary,#3f27c7)] to-[var(--color-soft,#5b3fe0)]",
    hover: "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(63,39,199,.7)]",
    active: "active:translate-y-0",
  },
  ghost: {
    base: "inline-flex items-center justify-center gap-2 rounded-[12px] border border-[var(--color-border,#eceef4)] px-5 py-3 font-semibold cursor-pointer transition-all duration-150 text-[var(--color-text,#1f2430)]",
    bg: "bg-[var(--color-card,#fff)]",
    hover: "hover:border-[var(--color-border-strong,#e0e3ec)] hover:bg-[var(--color-card-2,#f9fafb)]",
    active: "active:translate-y-px",
  },
  cancel: {
    base: "inline-flex items-center justify-center gap-2 rounded-[12px] border border-[var(--color-border,#eceef4)] px-5 py-3 font-semibold cursor-pointer transition-all duration-150 text-[var(--color-text,#1f2430)]",
    bg: "bg-[var(--color-card,#fff)]",
    hover: "hover:border-[var(--color-border-strong,#e0e3ec)] hover:bg-[var(--color-card-2,#f9fafb)]",
    active: "active:translate-y-px",
  },
  danger: {
    base: "inline-flex items-center justify-center gap-2 rounded-[12px] border-0 px-5 py-3 font-semibold text-white cursor-pointer transition-all duration-150",
    bg: "bg-[#f43f5e]",
    hover: "hover:bg-[#e11d48]",
    active: "active:translate-y-px",
  },
  checkedIn: {
    base: "inline-flex items-center justify-center gap-1.5 rounded-[12px] border-0 px-5 py-3 font-semibold text-white cursor-pointer transition-all duration-150",
    bg: "bg-emerald-500",
    hover: "hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(16,185,129,.5)]",
    active: "active:translate-y-0",
  },
  checkedOut: {
    base: "inline-flex items-center justify-center gap-1.5 rounded-[12px] border-0 px-5 py-3 font-semibold text-white cursor-pointer transition-all duration-150",
    bg: "bg-orange-500",
    hover: "hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(249,115,22,.5)]",
    active: "active:translate-y-0",
  },
};

const SIZES = {
  sm: "px-3.5 py-2 text-xs rounded-[10px]",
  md: "px-5 py-3 text-lg rounded-[12px]",
};

function Button({
  children,
  onClick,
  type = "primary",
  size = "md",
  typeBtn = "button",
  disabled,
  isLink = false,
}) {
  const navigate = useNavigate();
  const v = VARIANTS[type] || VARIANTS.primary;
  const sizeClass = SIZES[size] || "";

  const className = [v.base, v.bg, v.hover, v.active, sizeClass].join(" ");

  if (isLink)
    return (
      <button
        type={typeBtn}
        className={className}
        onClick={() => (!onClick ? navigate(-1) : onClick())}
        disabled={disabled}
      >
        {children}
      </button>
    );

  return (
    <button
      type={typeBtn}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;