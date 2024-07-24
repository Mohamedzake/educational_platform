import Button from "../../ui/Button";
import CreateUserForm from "./CreateInstructorsForm";
import Modal from "../../ui/Modal";
import CreateInstructorsForm from "./CreateInstructorsForm";

function AddInstructors() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button>Add new Instructor</Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateInstructorsForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddInstructors;
