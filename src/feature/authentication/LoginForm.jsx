import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import useLogin from "./useLogin";
import useUser from "./useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Logo from "../../ui/Logo";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const { login, isPending } = useLogin();
  const { user } = useUser();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="bg-secondary text-pri-text placeholder:text-pri-text flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="w-80 h-50">
        <Logo className="size-full scale-100 object-cover" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary flex max-h-80 w-95 flex-col items-center gap-y-5.5 rounded-md px-13 py-8 shadow-xs"
      >
        <div className="flex w-full flex-col gap-y-2">
          <label>Email address</label>
          <Form.InputText
            register={register("email", {
              required: "Email address is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email format is incorrect!.",
              },
            })}
            type="email"
            placeholder="Email"
            w_full={true}
            disabled={isPending}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex w-full flex-col gap-y-2">
          <label>Password</label>
          <Form.InputText
            register={register("password", {
              required: "Password address is required.",
              minLength: {
                value: 6,
                message: "Password should be a minimum of 6 characters.",
              },
            })}
            placeholder="Password"
            type="password"
            w_full={true}
            disabled={isPending}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button typeBtn="submit" type="primaryF">
          {isPending ? "Logging..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
