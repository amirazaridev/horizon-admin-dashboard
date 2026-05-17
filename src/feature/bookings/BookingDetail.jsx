import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  if (isLoading) return <Spinner />;

  const { status, id } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <div className="mb-8 flex justify-between">
        <div className="flex items-center gap-x-5">
          <Heading>Booking #{id}</Heading>
          <Tag inTable={false} color={statusToTagName[status]}>
            {status}
          </Tag>
        </div>
        <Button type="cancel" isLink={true}>
          <FaArrowLeft /> Back
        </Button>
      </div>
      <BookingDataBox booking={booking}/>
    </>
  );
}

export default BookingDetail;
