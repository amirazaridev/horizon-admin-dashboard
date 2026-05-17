import { useSearchParams } from "react-router";

function Filter({ options = [], filterField }) {
  const [searchParam] = useSearchParams();
  const currentFilter = searchParam.get(filterField) || options[0].value;
  return (
    <div className="bg-primary text-pri-text flex flex-col gap-0.5 rounded-md text-sm shadow-sm sm:flex-row sm:text-base lg:text-lg">
      {options.map((option) => (
        <FilterButton
          key={crypto.randomUUID()}
          field={filterField}
          value={option.value}
          active={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </div>
  );
}

function FilterButton({ children, value, field, active }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const handleClick = () => {
    searchParam.set(field, value);
    if (searchParam.get("page")) searchParam.set("page", 1);
    setSearchParam(searchParam);
  };
  return (
    <button
      disabled={active}
      className={`hover:bg-btn rounded-sm p-1.5 opacity-100 transition-colors duration-500 hover:text-white ${active ? "bg-btn text-white" : "text-pri-text"}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
export default Filter;
