import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

import { useSubject } from "./useSubject";
import CreateQuizForm from "./CreateQuizForm";
function AddQuiz() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const { subject } = useSubject();
  // console.log(subject?.data?.course?.instructor);
  const instructor1 = user?.data?.user?.name;
  const instructor2 = subject?.data?.course?.instructor;
  const instructor3 = user?.data?.user?.role;
  return (
    <div>
      {/* {instructor1 === instructor2 ? <Button>Add new Item</Button> : ""} */}
      <Modal>
        {instructor1 === instructor2 || instructor3 === "admin" ? (
          <>
            <Modal.Open opens="subject-form">
              <Button>Add New Question</Button>
            </Modal.Open>
            <Modal.Window name="subject-form">
              <CreateQuizForm />
            </Modal.Window>
          </>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
}

export default AddQuiz;
