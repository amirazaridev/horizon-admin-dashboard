import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import { useNavigate } from "react-router";
import CheckBox from "../../ui/CheckBox";
import { useSetting } from "../settings/useSetting";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { useCheckin } from "./useCheckin";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  const { checkin, isCheckingIn } = useCheckin();
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isGetSetting } = useSetting();

  useEffect(() => {
    if (booking?.isPaid) setConfirmPaid(true);
  }, [booking]);

  if (isLoading || isGetSetting) return <Spinner />;

  const {
    id,
    totalPrice,
    numNights,
    numGuests,
    hasBreakfast,
    guest: { fullName } = {},
  } = booking;
  const calcuteBreakfastPrice = settings.breakfastPrice * numNights * numGuests;

  const handleClick = () => {
    if (!confirmPaid) return;

    if (addBreakFast)
      checkin({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: calcuteBreakfastPrice,
          totalPrice: totalPrice + calcuteBreakfastPrice,
        },
      });
    else checkin({ id, breakfast: {} });
  };

  return (
    <>
      <div className="mb-8 flex justify-between">
        <div className="flex items-center gap-x-5">
          <Heading>Check in booking #{id}</Heading>
        </div>
        <Button type="cancel" isLink={true}>
          <FaArrowLeft /> Back
        </Button>
      </div>
      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="bg-primary mt-2 flex items-center gap-x-2 rounded-md px-6 py-3 shadow-xs">
          <CheckBox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((st) => !st);
              setConfirmPaid(false);
            }}
            disable={isCheckingIn}
          >
            Want to add breakfast for ${calcuteBreakfastPrice}
          </CheckBox>
        </div>
      )}

      <div className="bg-primary mt-2 flex items-center gap-x-2 rounded-md px-6 py-3 shadow-xs">
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((st) => !st)}
          disable={confirmPaid || isCheckingIn}
        >
          I confirm that {fullName} has paid the total amount of $
          {addBreakFast
            ? `${totalPrice + calcuteBreakfastPrice} ($${totalPrice} + $${calcuteBreakfastPrice})`
            : totalPrice}
        </CheckBox>
      </div>

      <div className="mt-7 flex justify-end font-semibold">
        <Button
          disabled={confirmPaid && isCheckingIn}
          type="primary"
          onClick={handleClick}
        >
          Check in booking #{id}
        </Button>
      </div>
    </>
  );
}

export default CheckinBooking;
