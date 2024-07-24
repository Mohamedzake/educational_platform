import styled from "styled-components";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import SubjectTable from "./SubjectTable";
import { apiSubject } from "../../services/apiSubjects";
import Spinner from "../../ui/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddSubject from "./AddSubject";
import { apiSubject2 } from "../../services/apiSubjects2";
import Tasks from "./Tasks";
import AddQuiz from "./AddQuiz";
import QuizTable from "./QuizTable";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/apiAuth";
import { apiQuizAll, apiQuizDate } from "../../services/apiQuiz";
import { useSubject } from "./useSubject";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 4fr;
  background-color: #0369a1;
  column-gap: 0.6rem;
  align-items: center;
  margin-bottom: 2rem;
  color: #fff;
  padding: 1rem 1rem 2rem 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  /* &:not(:last-child) {
    border-bottom: 1rem solid #f9fafb;
  } */
`;
const Img = styled.img`
  display: block;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;
const Row = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  font-size: 1.3rem;
  /* padding: 1rem 1rem 2rem 1rem; */
  border-bottom: 10px solid #f9fafb;
`;
const Header = styled.header`
  font-size: 2rem;
`;
const Nav = styled.nav`
  display: flex;
  gap: 4rem;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  color: #4338ca;
  font-size: 1.5rem;
  font-weight: 600;
`;

// const Input = styled.input`
//   width: 7rem;
//   margin-bottom: 3rem;
// `;
const Input = styled.input`
  border: 1px solid #d1d5db;
  background-color: #fff;
  border-radius: 5px;
  width: 10rem;
  padding: 0.4rem 0.6rem;
  margin: 3rem 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;
const TableRow2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  column-gap: 2.2rem;
  align-items: center;
  padding: 1.2rem 2.2rem;

  &:not(:last-child) {
    border-bottom: 2px solid #f3f4f6;
  }
`;
function SubjectDetailsBox({ subject = {} }) {
  const { subject: subject1 } = useSubject();
  const { subjectId } = useParams();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState("");
  const { data: date12 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  console.log(date12?.[0]?.target);
  const target = date12?.[0]?.target;
  console.log(target);
  useEffect(
    function () {
      fetch(
        `http://localhost:5000/api/v1/questions?course=${subjectId}&target=${target}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.log("Errror"));
    },
    [token, subjectId, target]
  );

  console.log(questions?.data?.length);
  const { year } = useParams();
  const navigate = useNavigate();
  const { name: name1, image, _id: ids } = subject;

  console.log(subjectId);

  const {
    isLoading,
    data: subjectDs,
    error,
  } = useQuery({
    queryKey: ["subject"],
    queryFn: () => apiSubject2(subjectId),
  });
  ////

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // const target = "Quiz";
  const { data: date2 } = useQuery({
    queryKey: ["quizGrades", target],
    queryFn: () => apiQuizAll(target, subjectId),
  });

  const { data: date1 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  const [time, setTimee] = useState(false);
  console.log(date1);
  console.log(date1?.[0]?.endTime);
  const date22 = date1?.[0]?.date;
  const startTime = date1?.[0]?.startTime;
  const endTime = date1?.[0]?.endTime;
  const currentDateTime = new Date();

  const providedDateTime = new Date(`${date22} ${startTime}`);
  const endDateTime = new Date(`${date22} ${endTime}`);
  // const timee = currentDateTime >= endDateTime;
  // console.log(timee);
  console.log(date2);
  const user1 = user?.data?.user?.name;
  const user2 = user?.data?.user?.role;
  const [showB, setShowB] = useState("false");
  useEffect(() => {
    if (currentDateTime >= endDateTime) {
      console.log("ture");
      setTimee("ture");
    } else {
      setTimee("false");
      console.log("false");
    }
  }, [currentDateTime, endDateTime]);
  useEffect(() => {
    if (date2?.some((date) => date?.user?.name === user1)) {
      console.log("ture");
      setShowB("ture");
    } else {
      setShowB("false");
      console.log("false");
    }
  }, [date2, user1]);
  console.log(showB);

  console.log(user?.data?.user?._id);
  if (isLoading) return <Spinner />;
  console.log(subjectDs);
  console.log(subject);

  // console.log(subject?.instructor);
  const instructor1 = user?.data?.user?.name;
  const instructor2 = subject1?.data?.course?.instructor;
  // console.log(instructor2);
  // console.log(subject1);
  return (
    <>
      <TableRow>
        <Img src={image || "/default-user.jpg"} />
        <Header>{name1}</Header>
      </TableRow>
      {subjectDs?.types?.map((subjectD) => (
        <>
          <SubjectTable subjectD={subjectD} key={subjectD.id} />
        </>
      ))}
      {/* <Button
        id={subjectId}
        onClick={() => navigate(`/${year}/subjects/tasks/${subjectId}`)}
      >
        tasks
      </Button> */}
      {instructor1 === instructor2 || user2 === "user" ? (
        <>
          {time !== "ture" ? (
            <>
              {showB !== "ture" ? (
                <>
                  {questions?.data?.length === 0 ? (
                    ""
                  ) : (
                    <Div
                      id={subjectId}
                      onClick={() =>
                        navigate(`/${year}/subjects/quiz/${subjectId}`)
                      }
                    >
                      <Button>New Quiz</Button>
                    </Div>
                  )}
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}

      {/* <Button
        id={subjectId}
        onClick={() => navigate(`/${year}/subjects/createQuiz/${subjectId}`)}
      >
        CreateQuiz
      </Button> */}
      <AddSubject />
    </>
  );
}

export default SubjectDetailsBox;
