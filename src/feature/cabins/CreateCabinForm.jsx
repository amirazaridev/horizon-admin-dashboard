import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isEditing;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { id: editId, cabin: { ...data, image } },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        },
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        },
      );
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Title>{isEditSession ? "Edit" : "Create"} Cabin</Form.Title>
      <Form.Row label="Cabin Name" error={errors?.name?.message}>
        <Form.InputText
          type="text"
          id="name"
          disabled={isWorking}
          register={register("name", { required: "This field is required" })}
        />
      </Form.Row>
      <Form.Row label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Form.InputText
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          register={register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </Form.Row>
      <Form.Row label="Regular price" error={errors?.regularPrice?.message}>
        <Form.InputText
          type="number"
          id="regularPrice"
          disabled={isWorking}
          register={register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </Form.Row>
      <Form.Row label="Discount" error={errors?.discount?.message}>
        <Form.InputText
          type="number"
          id="discount"
          disabled={isWorking}
          register={register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </Form.Row>
      <Form.Row
        label="Description for website"
        error={errors?.description?.message}
      >
        <Form.TextArea
          id="description"
          disabled={isWorking}
          register={register("description", {
            required: "This field is required",
          })}
        />
      </Form.Row>
      <Form.Row
        className="border-none"
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <Form.InputImg
          id="image"
          disabled={isWorking}
          register={register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </Form.Row>
      <div className="mt-8 flex gap-x-2 self-end">
        <Button
          disabled={isWorking}
          type="cancel"
          typeBtn="reset"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} typeBtn="submit">
          {isEditSession ? "Edit" : "Create"} Cabin
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
