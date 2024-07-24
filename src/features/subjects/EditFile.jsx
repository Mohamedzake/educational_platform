import { apiSubject } from "../../services/apiSubjects";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateSubjectForm from "./CreateSubjectForm";
import { useQuery } from "@tanstack/react-query";
function EditFile({ subjectDsm, type }) {
  const { _id: subjectId } = subjectDsm;
  // const {
  //   isLoading,
  //   data: subjectDss,
  //   error,
  // } = useQuery({
  //   queryKey: ["subjectw"],
  //   queryFn: () => apiSubject(),
  // });
  // console.log(subjectDss);
  // console.log("moee");
  return (
    <div>
      <CreateSubjectForm type={type} cabinToEdit={subjectDsm} />
    </div>
  );
}

export default EditFile;
