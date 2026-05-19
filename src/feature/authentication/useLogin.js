import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: () => {
      toast.success("You have successfully logged in.");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect!");
      console.error(err);
    },
  });
  return { login, isPending };
}

export default useLogin;
