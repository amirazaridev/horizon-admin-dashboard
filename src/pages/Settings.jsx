import UpdateSettingForm from "../feature/settings/UpdateSettingForm";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TitleContainer from "../ui/TitleContainer";

function Settings() {
  return (
    <Container>
      <TitleContainer>
        <Heading as="h2">Update hotel settings</Heading>
      </TitleContainer>
      <UpdateSettingForm />
    </Container>
  );
}

export default Settings;
