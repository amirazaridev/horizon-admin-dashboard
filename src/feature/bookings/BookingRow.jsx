import { format, isToday } from "date-fns";
import Table from "../../ui/Table";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router";

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guest: { fullName: guestName, email },
    cabin: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <Table.Row>
      <div className="font-semibold">{cabinName}</div>
      <div className="flex flex-col">
        <span className="font-medium">{guestName}</span>
        <span className="font-light">{email}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-medium">
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate) + " "}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="font-light">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>
      <div>
        <Tag color={statusToTagName[status]}>{status}</Tag>
      </div>
      <div className="font-medium">{formatCurrency(totalPrice)}</div>
      <div>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See details
          </Menus.Button>
        </Menus.List>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
