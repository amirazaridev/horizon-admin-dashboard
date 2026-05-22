import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { updateBooking } from "../../services/apiBooking";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: ( id ) =>
      updateBooking(id, {
        status: "checked-out"
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/dashboard");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkout, isCheckingOut };
}
