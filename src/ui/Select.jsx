function Select({ options = [], ...props }) {
  return (
    <select
      className="bg-primary rounded-sm p-1 shadow-sm md:min-w-60"
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
