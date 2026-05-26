import UserTable from "../feature/users/UserTable";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import TitleContainer from "../ui/TitleContainer";

function Users() {
  return <Container>
    <TitleContainer>
      <Heading>All Users</Heading>
    </TitleContainer>
    <UserTable />
  </Container>;
}

export default Users;
