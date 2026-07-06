import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBooking";

function useTodayActivity() {
  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { isLoading, isError, activities };
}

export default useTodayActivity;
