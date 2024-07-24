import { useEffect, useReducer, useState } from "react";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import Main from "../../ui/Main";
import Question from "../../ui/Question";
import StartScreen from "../../ui/StartScreen";
import NextButton from "../../ui/NextButton";
import Progress from "../../ui/Progress";
import FinishScreen from "../../ui/FinishScreen";
import Footer from "../../ui/Footer";
import Timer from "../../ui/Timer";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { apiQuiz, apiQuizAll, apiQuizDate } from "../../services/apiQuiz";
import { useParams } from "react-router-dom";
import { array } from "i/lib/util";
import { getCurrentUser } from "../../services/apiAuth";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f1f3f5;
  background-color: #343a40;
  min-height: 100vh;
  padding: 3.2rem;
`;
const Header = styled.header`
  width: 66rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

let SECS_PER_QUESTION = 10;

const initialState = {
  questions: [],
  //'loading' , 'error' , 'ready' ,'active', 'finished'

  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknow");
  }
}
function Quiz() {
  const token = localStorage.getItem("token");
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const { subjectId } = useParams();
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
        .then((data) => dispatch({ type: "dataReceived", payload: data.data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    },
    [token, subjectId, target]
  );

  const { data: date1 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  if (date1?.[0]?.time) {
    SECS_PER_QUESTION = date1?.[0]?.time;
  }
  // const mins = Math.floor(date1?.[0]?.time / 60);
  // const seconds = date1?.[0]?.time % 60;
  // console.log({ mins, seconds });

  // const endTimes = date1?.[0]?.startTime + `${mins}:${seconds}`;
  // console.log(endTimes);
  console.log(date1?.[0]?.time);
  console.log(date1?.[0]?.time);
  console.log(date1?.[0]?.date);
  const date2 = date1?.[0]?.date;
  const startTime = date1?.[0]?.startTime;
  const endTime = date1?.[0]?.endTime;
  const currentDateTime = new Date();
  const providedDateTime = new Date(`${date2} ${startTime}`);
  const endDateTime = new Date(`${date2} ${endTime}`);
  //

  const [showB, setShowB] = useState("false");
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // const target = "Quiz";
  const { data: date3 } = useQuery({
    queryKey: ["quizGrades"],
    queryFn: () => apiQuizAll(target, subjectId),
  });
  // console.log(date3);
  const user1 = user?.data?.user?.name;
  useEffect(() => {
    if (date3?.some((date) => date?.user?.name === user1)) {
      console.log("ture");
      setShowB("ture");
    } else {
      setShowB("false");
      console.log("false");
    }
  }, [date3, user1]);
  console.log(showB);
  return (
    <>
      <Div>
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <>
              {showB === "ture" ? (
                <FinishScreen
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  dispatch={dispatch}
                  highscore={highscore}
                />
              ) : (
                <StartScreen
                  numQuestions={numQuestions}
                  dispatch={dispatch}
                  currentDateTime={currentDateTime}
                  providedDateTime={providedDateTime}
                  endDateTime={endDateTime}
                />
              )}
            </>
          )}
          {status === "active" && (
            <>
              <Progress
                numQuestions={numQuestions}
                index={index}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              dispatch={dispatch}
              highscore={highscore}
            />
          )}
        </Main>
      </Div>
    </>
  );
}

export default Quiz;
