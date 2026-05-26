import AddCabin from "../feature/cabins/AddCabin";
import CabinTable from "../feature/cabins/cabinTable";
import CabinTableOperations from "../feature/cabins/CabinTableOperations";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TitleContainer from "../ui/TitleContainer";

function Cabins() {
  return (
    <Container>
      <TitleContainer>
        <Heading as="h2">All Cabins</Heading>
        <CabinTableOperations />
      </TitleContainer>
      <CabinTable />
      <AddCabin />
    </Container>
  );
}

export default Cabins;
