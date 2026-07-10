import { useSearchParams } from "react-router";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    // ریست کردن صفحه به ۱ هنگام تغییر مرتب‌سازی
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-3">

      {/* The Modernized Select */}
      <Select 
        value={sortBy} 
        onChange={handleChange} 
        options={options}
      />
    </div>
  );
}

export default SortBy;