import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { insertUser } from "../../services/apiUser";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationFn: (newUser) => insertUser(newUser),
    onSuccess: () => {
      toast.success("New user successfully created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createUser, isCreating };
}
