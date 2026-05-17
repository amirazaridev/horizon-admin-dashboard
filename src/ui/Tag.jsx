function Tag({ children, color, inTable = true }) {
  return (
    <span
      className={`text-tag-${color}-100 bg-tag-${color}-700 flex w-20 items-center justify-center rounded-md text-xs uppercase ${inTable ? "lg:w-32 px-2 py-1" : "lg:w-28 lg:h-7"} lg:text-sm`}
    >
      {children}
    </span>
  );
}

export default Tag;
