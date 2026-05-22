function Stat({ title, color, icon, value }) {
  const colorClass = {
    blue: "bg-blue-500 text-blue-800",
    yellow: "bg-yellow-300/50 text-yellow-800",
    green: "bg-green-300/70 text-green-800",
    indigo: "bg-indigo-300/50 text-indigo-700",
  };
  return (
    <div className="bg-primary w-full flex h-15 items-center gap-x-2 rounded-md px-6 shadow-xs">
      <div
        className={`${colorClass[color]} flex size-11 items-center justify-center rounded-full`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase">{title}</span>
        <span className="text-lg font-semibold">{value}</span>
      </div>
    </div>
  );
}

export default Stat;
