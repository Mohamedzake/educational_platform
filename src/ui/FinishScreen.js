import styled from "styled-components";
import { apiQuizAll, apiQuizDate, createQuizGr } from "../services/apiQuiz";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const B = styled.p`
  background-color: #1098ad;
  color: #f1f3f5;
  border-radius: 100px;
  text-align: center;
  padding: 2rem 0;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.6rem;
  & span {
    font-size: 2rem;
    margin-right: 4px;
  }
`;
const Button = styled.button`
  display: block;
  font-family: inherit;
  color: inherit;
  font-size: 2rem;
  border: 2px solid #495057;
  background-color: #495057;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.3s;
  float: right;
  &:not([disabled]):hover {
    background-color: #343a40;
  }
  &[disabled]:hover {
    cursor: not-allowed;
  }
`;
const Bp = styled.p`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4.8rem;
`;
function FinishScreen({ points, maxPossiblePoints, dispatch, highscore }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  const { subjectId } = useParams();
  const course = subjectId;
  const mark = `${points.toLocaleString()}/${maxPossiblePoints.toLocaleString()}`;
  const { data: date12 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  console.log(date12?.[0]?.target);
  const target = date12?.[0]?.target;
  console.log(target);
  // const target = "Quiz";
  const data = { mark, course, target };
  const { data: date1 } = useQuery({
    queryKey: ["quizGrade"],
    queryFn: () => createQuizGr(data),
  });
  const { data: date2 } = useQuery({
    queryKey: ["quizGrades"],
    queryFn: () => apiQuizAll(),
  });
  console.log(date2);
  return (
    <>
      {/* <B className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </B> */}
      <Bp className="highscore">your quiz is Finish</Bp>
      {/* <Bp className="highscore">(Highscore: {highscore} points)</Bp> */}
      {/* <Button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </Button> */}
    </>
  );
}

export default FinishScreen;
