import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";
import CheckoutButton from "../check-in-out/CheckoutButton";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if(!booking) return <Empty resourceName='bookings' />

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
      <BookingDataBox booking={booking} />
      <div className="mt-7 flex justify-end font-semibold">
        {status === "unconfirmed" && (
          <Button type="primary" onClick={() => navigate(`/checkin/${id}`)}>
            Check in booking #{id}
          </Button>
        )}
        {status === "checked-in" && <CheckoutButton id={id} />}
        <Modal>
          <Modal.Open opens="delete">
            <Button type="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resName="bookings"
              onConfirm={() => {
                deleteBooking(id);
                navigate("/bookings");
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default BookingDetail;
