import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiUser";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ user, id }) => updateUserApi(user, id),
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
