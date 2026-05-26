import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

function useUser() {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  const isOwner = user?.role === "owner";
  return { user, isLoading, refetch, isOwner };
}

export default useUser;
