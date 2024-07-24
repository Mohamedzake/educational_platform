import { useQuery } from "@tanstack/react-query";
import { apiSubject2 } from "../../services/apiSubjects2";
import { useParams } from "react-router-dom";
import Task from "./Task";
import AddSubject from "./AddSubject";
import styled from "styled-components";
const Table = styled.div`
  padding-top: 2rem;
  background-color: #fff;
`;
function Tasks() {
  const { subjectId } = useParams();
  const task1 = "true";
  const {
    isLoading,
    data: subjectDs,
    error,
  } = useQuery({
    queryKey: ["subject", task1],
    queryFn: () => apiSubject2(subjectId, task1),
  });

  console.log(subjectId);
  return (
    <Table>
      {subjectDs?.types?.map((subjectD) => (
        <Task subjectD={subjectD} key={subjectD.id} />
      ))}
      <AddSubject />
    </Table>
  );
}
export default Tasks;
//  <SubjectTable subjectD={subjectD} key={subjectD.id} />
