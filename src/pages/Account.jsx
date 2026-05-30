import UpdatePassForm from "../feature/users/UpdatePassForm";
import UpdateUserDataForm from "../feature/users/UpdateUserDataForm";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TitleContainer from "../ui/TitleContainer";

function Account() {
  return (
    <Container>
      <TitleContainer>
        <Heading>Update your account</Heading>
      </TitleContainer>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
        <Heading as="h3">Update user password</Heading>
        <UpdatePassForm />
    </Container>
  );
}

export default Account;
