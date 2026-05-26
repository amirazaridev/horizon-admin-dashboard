import { HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import { useRemoveUser } from "./useRemoveUser";

function UserRow({ user }) {
  const { removeUser } = useRemoveUser();

  const { name, email, role, guestProfile, id } = user;

  const rolesToTagName = {
    owner: "blue",
    admin: "green",
    guest: "silver",
  };
  return (
    <Table.Row>
      <div className="flex flex-col ps-3">
        <span className="font-medium">{name || guestProfile.fullName}</span>
        <span className="font-light">{email}</span>
      </div>
      <div>{guestProfile?.phoneNumber}</div>
      <div>{guestProfile?.nationalID}</div>
      <div>{guestProfile?.dateOfBirth}</div>
      <div>{guestProfile?.gender}</div>
      <div>
        <Tag color={rolesToTagName[role]}>{role}</Tag>
      </div>
      <div className="pe-5 text-end">
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button onClick={() => removeUser(id)} icon={<HiTrash />}>
            Delete
          </Menus.Button>
        </Menus.List>
      </div>
    </Table.Row>
  );
}

export default UserRow;
