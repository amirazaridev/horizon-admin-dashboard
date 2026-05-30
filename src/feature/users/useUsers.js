import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUser";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constant";

export function useUsers() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");
  const query = { limit: PAGE_SIZE, page };

  const {
    data: { users, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(query),
  });

  return { users, isLoading, error, count };
}
