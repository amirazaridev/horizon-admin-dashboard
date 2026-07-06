function Stat({ title, color, icon, value }) {
  const iconBg = {
    indigo: "bg-[linear-gradient(135deg,#6366f1,#4f46e5)]",
    green: "bg-[linear-gradient(135deg,#34d399,#22c55e)]",
    amber: "bg-[linear-gradient(135deg,#fbbf24,#f59e0b)]",
    rose: "bg-[linear-gradient(135deg,#fb7185,#f43f5e)]",
  };

  return (
    <div className="border-border bg-card flex w-full flex-col gap-3.5 rounded-[18px] p-5 shadow-shadow-soft transition-[transform,border-color] duration-200 hover:-translate-y-0.75 hover:border-border-strong">
      {/* icon */}
      <div
        className={`${iconBg[color]} grid size-11.5 place-items-center rounded-xl text-white`}
      >
        {icon}
      </div>

      {/* value */}
      <span className="text-[27px] leading-none font-extrabold tracking-tight text-text">
        {value}
      </span>

      {/* label */}
      <span className="text-sm text-text-muted">
        {title}
      </span>
    </div>
  );
}

export default Stat;
