import { useNavigate, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import AddQuiz from "./AddQuiz";
import CreateQuizForm from "./CreateQuizForm";
import QuizDateForm from "./QuizDateForm";
import QuizDateTable from "./QuizDateTable";
import QuizGrades from "./QuizGrades";
import QuizTable from "./QuizTable";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { apiQuiz, apiQuizDate } from "../../services/apiQuiz";
import QuizSearch from "./QuizSearch";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;
function CreateQuiz() {
  const { subjectId } = useParams();
  const { year } = useParams();
  const navigate = useNavigate();
  const { data: date1 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  console.log(date1);
  //
  // const targett = date1?.[0]?.target;
  // const corseId = date1?.[0]?.course;
  // console.log(targett, corseId);
  // const { data: date4 } = useQuery({
  //   queryKey: ["quiz"],
  //   queryFn: () => apiQuiz(corseId, targett),
  // });
  // console.log(date4);
  console.log(date1?.length);
  console.log(date1?.[0]?.target);

  return (
    <>
      <Div>
        <Button
          id={subjectId}
          onClick={() => navigate(`/${year}/subjects/quizGrades/${subjectId}`)}
        >
          QuizGrades
        </Button>
      </Div>
      {/* <QuizSearch /> */}
      {date1?.length === 0 ? (
        <Modal>
          <Modal.Open opens="subject-form">
            <Button>Add date for Quiz</Button>
          </Modal.Open>
          <Modal.Window name="subject-form">
            <QuizDateForm />
          </Modal.Window>
        </Modal>
      ) : (
        <QuizDateTable />
      )}

      <QuizTable />
      <AddQuiz />
    </>
  );
}

export default CreateQuiz;
