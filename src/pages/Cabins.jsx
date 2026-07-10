import { useTranslation } from "react-i18next";
import AddCabin from "../feature/cabins/AddCabin";
import CabinTable from "../feature/cabins/cabinTable";
import CabinTableOperations from "../feature/cabins/CabinTableOperations";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TitleContainer from "../ui/TitleContainer";

function Cabins() {
  const { t } = useTranslation();

  return (
    <Container>
      <TitleContainer>
        <Heading as="h2">{t("cabins.title")}</Heading>
        <CabinTableOperations />
        <div className="h-1/2">
          <AddCabin />
        </div>
      </TitleContainer>
      <CabinTable />
    </Container>
  );
}

export default Cabins;
