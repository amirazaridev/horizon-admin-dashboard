import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";

function AddUser() {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add new user</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateUserForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddUser;
