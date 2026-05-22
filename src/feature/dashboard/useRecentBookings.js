import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router";
import { getBookingAfterDate } from "../../services/apiBooking";

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings, numDays };
}

export default useRecentBookings;
