import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const sortBy = searchParam.get("sortBy") || "";

  const handleChange = (e) => {
    searchParam.set("sortBy", e.target.value);
    if (searchParam.get("page")) searchParam.set("page", 1);
    setSearchParam(searchParam);
  };
  return <Select value={sortBy} onChange={handleChange} options={options} />;
}

export default SortBy;
