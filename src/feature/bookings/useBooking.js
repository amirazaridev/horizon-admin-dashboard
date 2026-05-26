import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBooking";
import { useParams } from "react-router";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking",bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  
  return { booking, isLoading, error };
}
