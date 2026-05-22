import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBooking";

function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { isLoading, activities };
}

export default useTodayActivity;
