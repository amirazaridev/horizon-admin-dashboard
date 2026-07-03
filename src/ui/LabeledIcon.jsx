const SIZES = {
  sm: { tile: "size-9 rounded-lg", icon: "size-5", label: "text-sm", gap: "gap-x-2.5" },
  md: { tile: "size-11 rounded-xl", icon: "size-6", label: "text-base", gap: "gap-x-3" },
  lg: { tile: "size-12.5 rounded-xl", icon: "size-7", label: "text-xl", gap: "gap-x-4" },
};

const COLORS = {
  indigo: {
    solid: {
      tile: "bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white",
      shadow: "shadow-[0_6px_18px_-6px_rgba(99,102,241,.6)]",
    },
    soft: { tile: "bg-[#6366f1]/14 text-[#818cf8]", shadow: "" },
    glass: {
      tile: "bg-white/18 text-white border border-white/25 backdrop-blur-sm",
      shadow: "",
    },
  },
  green: {
    solid: {
      tile: "bg-gradient-to-br from-[#34d399] to-[#22c55e] text-white",
      shadow: "shadow-[0_6px_18px_-6px_rgba(34,197,94,.6)]",
    },
    soft: { tile: "bg-[#22c55e]/14 text-[#4ade80]", shadow: "" },
    glass: {
      tile: "bg-white/18 text-white border border-white/25 backdrop-blur-sm",
      shadow: "",
    },
  },
  amber: {
    solid: {
      tile: "bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-white",
      shadow: "shadow-[0_6px_18px_-6px_rgba(245,158,11,.6)]",
    },
    soft: { tile: "bg-[#f59e0b]/14 text-[#fbbf24]", shadow: "" },
    glass: {
      tile: "bg-white/18 text-white border border-white/25 backdrop-blur-sm",
      shadow: "",
    },
  },
  rose: {
    solid: {
      tile: "bg-gradient-to-br from-[#fb7185] to-[#f43f5e] text-white",
      shadow: "shadow-[0_6px_18px_-6px_rgba(244,63,94,.6)]",
    },
    soft: { tile: "bg-[#f43f5e]/14 text-[#fb7185]", shadow: "" },
    glass: {
      tile: "bg-white/18 text-white border border-white/25 backdrop-blur-sm",
      shadow: "",
    },
  },
  white: {
    solid: {
      tile: "bg-white text-gray-900",
      shadow: "shadow-[0_6px_18px_-6px_rgba(0,0,0,.25)]",
    },
    soft: {
      tile: "bg-[var(--color-card,#fff)] text-[var(--color-text,#1f2430)] border border-[var(--color-border,#eceef4)]",
      shadow: "",
    },
    glass: {
      tile: "bg-white/18 text-white border border-white/25 backdrop-blur-sm",
      shadow: "",
    },
  },
};

function LabeledIcon({
  icon,
  text,
  size = "md",
  color = "indigo",
  variant = "solid",
  labelClass = "font-bold",
  className = "",
}) {
  const s = SIZES[size] || SIZES.md;
  const c = COLORS[color]?.[variant] || COLORS.indigo.solid;

  return (
    <div className={`relative flex items-center ${s.gap} ${className}`}>
      <div
        className={`grid place-items-center justify-center ${s.tile} ${c.tile} ${c.shadow}`}
      >
        {/* Clone the icon so its className (size) is applied consistently */}
        {icon}
      </div>
      <h2 className={`${s.label} ${labelClass}`}>{text}</h2>
    </div>
  );
}

export default LabeledIcon;
