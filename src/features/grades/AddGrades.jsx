import Button from "../../ui/Button";
import CreateGradesForm from "./CreateGradesForm";
import Modal from "../../ui/Modal";
import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

function AddGrades() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const user1 = user?.data?.user?.role;
  return (
    <div>
      {user1 === "user" ? (
        ""
      ) : (
        <Modal>
          <Modal.Open opens="user-form">
            <Button>Add new userGrade</Button>
          </Modal.Open>
          <Modal.Window name="user-form">
            <CreateGradesForm />
          </Modal.Window>
        </Modal>
      )}
    </div>
  );
}

export default AddGrades;
