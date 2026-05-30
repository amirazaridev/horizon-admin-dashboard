import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { useCreateUser } from "./useCreateUser";

function CreateUserForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const { createUser, isCreating } = useCreateUser();

  const onSubmit = (data) => {
    createUser(data, {
      onSuccess: () => {
        reset();
        onCloseModal();
      },
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Title>Create User</Form.Title>
      <Form.Row label="Name" error={errors?.name?.message}>
        <Form.InputText
          type="text"
          id="name"
          disabled={isCreating}
          register={register("name", { required: "This field is required" })}
        />
      </Form.Row>
      <Form.Row label="Email" error={errors?.email?.message}>
        <Form.InputText
          type="email"
          id="email"
          disabled={isCreating}
          register={register("email", {
            required: "Email address is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email format is incorrect!.",
            },
          })}
        />
      </Form.Row>
      <Form.Row label="Password" error={errors?.password?.message}>
        <Form.InputText
          type="password"
          id="password"
          disabled={isCreating}
          register={register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password should be a minimum of 6 characters.",
            },
          })}
        />
      </Form.Row>
      <Form.Row label="Re Password" error={errors?.rePassword?.message}>
        <Form.InputText
          type="password"
          id="rePassword"
          disabled={isCreating}
          register={register("rePassword", {
            required: "Password is required.",
            validate: {
              matchesPassword: (value) => {
                const { password } = getValues();
                return value === password || "Password do not match!";
              },
            },
          })}
        />
      </Form.Row>
      <Form.Row label="Role" error={errors?.role?.message}>
        <Select
          options={[
            { value: "guest", label: "Guest" },
            { value: "admin", label: "Admin" },
          ]}
          register={register("role")}
        />
      </Form.Row>
      <div className="mt-8 flex gap-x-2 self-end">
        <Button
          disabled={isCreating}
          type="cancel"
          typeBtn="reset"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isCreating} typeBtn="submit">
          Create User
        </Button>
      </div>
    </Form>
  );
}

export default CreateUserForm;
