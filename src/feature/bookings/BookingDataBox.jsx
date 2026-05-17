import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guest: { fullName: guestName, email, nationalID } = {},
    cabin: { name: cabinName } = {},
  } = booking;
  console.log(numGuests);

  return (
    <section className="bg-primary flex flex-col rounded-md shadow-xs [&>div]:px-8">
      <div className="bg-btn/75 flex h-11 items-center justify-between rounded-t-md text-lg text-white">
        <div className="flex items-center gap-x-4 font-semibold">
          <HiOutlineHomeModern className="size-6" />
          <p>
            {numNights} nights in Cabin {cabinName}
          </p>
        </div>
        <div>
          <p>
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        </div>
      </div>
      <div className="pt-2 pb-1">
        <div className="flex gap-x-3.5 py-2">
          <p className="font-semibold">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>
        {observations && (
          <div className="flex items-center gap-x-2 py-2">
            <span className="flex items-center gap-x-1 font-semibold">
              <HiOutlineChatBubbleBottomCenterText className="size-4.5" />{" "}
              observations :
            </span>
            <p>{observations}</p>
          </div>
        )}
        <div className="flex items-center gap-x-2">
          <span className="flex items-center gap-x-1 font-semibold">
            <HiOutlineCheckCircle className="size-4.5" />
            Breakfast included?
          </span>
          {hasBreakfast ? "Yes" : "No"}
        </div>
        <section className="my-4 flex justify-between rounded-md bg-pnl-y px-5 py-3 text-gray-600">
          <div className="flex items-center gap-x-4">
            <span className="flex items-center gap-x-1 font-semibold">
              <HiOutlineCurrencyDollar />
              Total price
            </span>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </div>

          <p className="font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </section>
        <div className="flex justify-end my-2">
          <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
        </div>
      </div>
    </section>
  );
}

export default BookingDataBox;
