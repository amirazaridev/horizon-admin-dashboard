import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import AddUser from "./AddUser";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers";

function UserTable() {
  const { users, isLoading, count } = useUsers();
  console.log(users);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Menus>
        <Table columns="1fr 0.8fr 1fr 0.8fr 0.6fr 0.7fr 0.5fr">
          <Table.Header>
            <div className="">User</div>
            <div className="">Phone</div>
            <div className="">National id</div>
            <div className="">Date of birth</div>
            <div className="">gender</div>
            <div className="">Roles</div>
            <div className="text-end">option</div>
          </Table.Header>
          <Table.Body
            data={users || []}
            render={(user) => <UserRow key={user.id} user={user} />}
          />
        </Table>
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Menus>
      <AddUser />
    </>
  );
}

export default UserTable;
