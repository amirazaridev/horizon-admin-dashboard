import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useUpdateUser } from "./useUpdateUser";
import useUser from "../authentication/useUser";

function UpdatePassForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const isWorking = isUpdating || isLoading;

  const onSubmit = (data) => {
    console.log(data);

    updateUser({ user: data, id: user.id });
  };

  return (
    <div className="bg-primary mt-4 rounded-md px-8 py-2 shadow-xs">
      <Form divide={false} onSubmit={handleSubmit(onSubmit)}>
        <Form.Row label="New password" error={errors?.password?.message}>
          <Form.InputText
            type="password"
            register={register("password", {
              minLength: {
                value: 6,
                message: "Password should be a minimum of 6 characters.",
              },
            })}
          />
        </Form.Row>
        <Form.Row
          label="Confirm password"
          error={errors?.confirmPassword?.message}
        >
          <Form.InputText
            type="password"
            register={register("confirmPassword", {
              validate: {
                matchesPassword: (value) => {
                  const { password } = getValues();
                  return value === password || "Password do not match!";
                },
              },
            })}
          />
        </Form.Row>
        <div className="mt-8 flex gap-x-2 self-end">
          <Button disabled={isWorking} typeBtn="submit">
            Update password
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdatePassForm;
