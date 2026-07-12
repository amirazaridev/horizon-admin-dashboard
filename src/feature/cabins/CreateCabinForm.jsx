import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { HiOutlineHome, HiOutlineHomeModern } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import ImageDropzone from "../../ui/ImageDropzone";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { t } = useTranslation();
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
      <Form.Header icon={<HiOutlineHome className="size-7" />}>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-xl font-bold">
            {isEditSession ? t("cabins.editCabin") : t("cabins.addNew")}
          </h3>
          <p className="text-text-muted text-sm">{t("cabins.descForm")}</p>
        </div>
      </Form.Header>
      <Form.Main>
        <Form.Row
          htmlFor="name"
          label={t("cabins.cabinName")}
          error={errors?.name?.message}
        >
          <Form.InputTextWithIcon
            icon={<HiOutlineHomeModern />}
            placeholder={t("cabins.cabinName")}
            type="text"
            id="name"
            disabled={isWorking}
            register={register("name", { required: "This field is required" })}
          />
        </Form.Row>
        <Form.Split>
          <Form.Row
            htmlFor="maxCapacity"
            label={t("cabins.maxCapacity")}
            error={errors?.maxCapacity?.message}
          >
            <Form.InputNumber
              text="نفر"
              id="maxCapacity"
              disabled={isWorking}
              register={register("maxCapacity", {
                required: "This field is required",
                min: { value: 1, message: "Capacity should be at least 1" },
              })}
            />
          </Form.Row>
          <Form.Row
            htmlFor="regularPrice"
            label={t("cabins.regularPrice")}
            error={errors?.regularPrice?.message}
          >
            <Form.InputNumber
              text="تومان"
              id="regularPrice"
              disabled={isWorking}
              register={register("regularPrice", {
                required: "This field is required",
                min: { value: 1, message: "Capacity should be at least 1" },
              })}
            />
          </Form.Row>
        </Form.Split>

        <Form.Row
          htmlFor="discount"
          label={t("cabins.discount")}
          error={errors?.discount?.message}
        >
          <Form.InputNumber
            text="تومان"
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
          htmlFor="description"
          label={t("cabins.description")}
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
          htmlFor="image"
          label={t("cabins.cabinPhoto")}
          error={errors?.image?.message}
        >
          <ImageDropzone
            id="image"
            register={register("image", {
              required: isEditSession ? false : t("cabins.imageRequired"),
            })}
            hasError={Boolean(errors.image)}
            defaultPreview={isEditSession ? cabinToEdit.image : null}
          />
        </Form.Row>
      </Form.Main>
      <Form.Footer>
        <Button
          disabled={isWorking}
          type="cancel"
          typeBtn="reset"
          onClick={onCloseModal}
        >
          {t("common.cancel")}
        </Button>
        <Button  disabled={isWorking} typeBtn="submit">
          {isEditSession ? "Edit" : <><span className="text-4xl font-extralight">+</span> {t("cabins.addCabin")}</>}
        </Button>
      </Form.Footer>
    </Form>
  );
}

export default CreateCabinForm;
