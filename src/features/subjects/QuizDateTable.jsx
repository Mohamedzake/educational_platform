import styled from "styled-components";
// import UserRow from "./UserRow";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { apiUsers } from "../../services/apiUsers";
import MenuIntroduction from "../../components/common/MenuIntroduction";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiQuiz, apiQuizDate } from "../../services/apiQuiz";
import QuizRow from "./QuizRow";
import QuizDateRow from "./QuizDateRow";

const Table = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 2fr 1fr 3fr 2.5fr 3.5fr 1fr 1fr;
  column-gap: 2.2rem;
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1.4rem 2.2rem;
`;

function QuizDateTable() {
  const { subjectId } = useParams();
  const { data: date1 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  console.log(date1);
  console.log(date1?.[0]?.date);

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>date</div>
        <div></div>
        <div>Time per qu(S)</div>

        <div>startTime</div>
        <div>endTime</div>
        <div></div>
        <div></div>
      </TableHeader>
      {date1?.map((date) => (
        <QuizDateRow date={date} key={date.id} />
      ))}
    </Table>
  );
}

export default QuizDateTable;
