import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/apiUser";
import toast from "react-hot-toast";

export function useRemoveUser() {
  const queryClient = useQueryClient();
  const { mutate: removeUser, isPending: isRemoving } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { removeUser, isRemoving };
}
