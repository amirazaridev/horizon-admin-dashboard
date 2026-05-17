import BookingTable from "../feature/bookings/BookingTable";
import BookingTableOperations from "../feature/bookings/BookingTableOperations";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TitleContainer from "../ui/TitleContainer";

function Bookings() {
  return (
    <Container>
      <TitleContainer>
        <Heading as="h2">Booking</Heading>
        <BookingTableOperations />
      </TitleContainer>
      <BookingTable />
    </Container>
  );
}

export default Bookings;
