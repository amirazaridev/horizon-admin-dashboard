import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSetting";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuests,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSetting();
  const { editSetting, isUpdating } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  const handleUpdate = (e, name) => {
    editSetting({[name]:e.target.value});
  };
  return (
    <section className="h-77 w-full rounded-md bg-primary p-5 shadow-2xs">
      <Form divide={false}>
        <Form.Row label="Minimum nights/booking">
          <Form.InputText
            onBlur={(e) => handleUpdate(e, "minBookingLength")}
            disabled={isUpdating}
            type="number"
            defValue={minBookingLength}
          />
        </Form.Row>
        <Form.Row label="Maximum nights/booking">
          <Form.InputText
            onBlur={(e) => handleUpdate(e, "maxBookingLength")}
            disabled={isUpdating}
            type="number"
            defValue={maxBookingLength}
          />
        </Form.Row>
        <Form.Row label="Maximum guests/booking">
          <Form.InputText
            onBlur={(e) => handleUpdate(e, "maxGuests")}
            disabled={isUpdating}
            type="number"
            defValue={maxGuests}
          />
        </Form.Row>
        <Form.Row label="Breakfast price">
          <Form.InputText
            onBlur={(e) => handleUpdate(e, "breakfastPrice")}
            disabled={isUpdating}
            type="number"
            defValue={breakfastPrice}
          />
        </Form.Row>
      </Form>
    </section>
  );
}

export default UpdateSettingForm;
