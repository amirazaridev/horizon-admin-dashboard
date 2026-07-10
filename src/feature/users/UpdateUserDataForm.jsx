import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useUpdateUser } from "./useUpdateUser";
import useUser from "../authentication/useUser";

function UpdateUserDataForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { user, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: user.email, name: user.name } });

  const isWorking = isUpdating || isLoading;

  const onSubmit = (data) => {
    updateUser(data);
  };

  return (
    <div className="bg-card my-4 rounded-md px-8 py-2 shadow-xs">
      <Form divide={false} onSubmit={handleSubmit(onSubmit)}>
        <Form.Row label="Email address" error={errors?.email?.message}>
          <Form.InputText
            type="email"
            register={register("email", {
              required: "Email address is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email format is incorrect!.",
              },
            })}
          />
        </Form.Row>
        <Form.Row label="Full name" error={errors?.name?.message}>
          <Form.InputText
            register={register("name", {
              required: "Name address is required.",
              minLength: {
                value: 4,
                message: "Name should be a minimum of 4 characters.",
              },
            })}
          />
        </Form.Row>
        <div className="mt-8 flex gap-x-2 self-end">
          <Button disabled={isWorking} typeBtn="submit">
            Update account
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateUserDataForm;
