import Button from "../../ui/Button";
import CreateSubjectForm2 from "./CreateSubjectForm2";
import Modal from "../../ui/Modal";
import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

import { useSubject } from "./useSubject";
function AddSubject() {
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
        {instructor1 === instructor2 ? (
          <>
            <Modal.Open opens="subject-form">
              <Button>Add new Item</Button>
            </Modal.Open>
            <Modal.Window name="subject-form">
              <CreateSubjectForm2 />
            </Modal.Window>
          </>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
}

export default AddSubject;
