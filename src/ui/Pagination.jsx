import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../utils/constant";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page");
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (pageCount <= 1 || pageCount < currentPage) return null;

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  };
  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-secondary flex justify-between rounded-b-md p-2 [&>span]:font-semibold">
      <p>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span>{count}</span> results.
      </p>
      <div className="[&>button]:hover:bg-nav-hover [&>button]:hover:text-textnav-hover flex gap-x-4.5 [&>button]:flex [&>button]:items-center [&>button]:rounded-md [&>button]:p-0.5 [&>button]:px-2">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </button>
        <button onClick={nextPage} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
