import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const [searchParams] = useSearchParams();
  // ? Filterring and Sorting
  const query = {};
  const filterValue = searchParams.get("status");
  if (filterValue && filterValue !== "all") query.status = filterValue;
  const sortbyValue = searchParams.get("sortBy");
  if (sortbyValue) query.sortBy = sortbyValue;
  // ? Pagination
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");
  query.limit = PAGE_SIZE;
  query.page = page;

  const {
    data: { bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortbyValue, page],
    queryFn: () => getBookings(query),
  });

  return { bookings, count, isLoading, error };
}
