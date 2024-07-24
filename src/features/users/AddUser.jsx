import Button from "../../ui/Button";
import CreateUserForm from "./CreateUserForm";
import Modal from "../../ui/Modal";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button>Add new user</Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
