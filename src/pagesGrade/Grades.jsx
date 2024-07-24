import { useParams } from "react-router-dom";
import AddGrades from "../features/grades/AddGrades";
import GradesTable from "../features/grades/GradesTable";

import Row from "../ui/Row";
import { useQuery } from "@tanstack/react-query";
import { apiCabins } from "../services/apiCabins";
import Spinner from "../ui/Spinner";
import SubjectRow from "../features/subjects/SubjectRow";
import styled from "styled-components";
import { apiUsers } from "../services/apiUsers";
import GradesRow from "../features/grades/GradesRow";
import { apiQuizAll } from "../services/apiQuiz";
import { useSubject } from "../features/subjects/useSubject";
const NavList = styled.ul`
  display: grid;
  grid-template-columns: 1.2fr 0.1fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 0.5fr 0.5fr 0.1fr;
  font-size: 0.9rem;
  /* gap: 1rem; */
  /* padding: 1rem; */
  color: #0369a1;
  /* background-color: #0369a1; */
`;
const Div2 = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1rem;
  /* background-color: #fff; */
  border-radius: 7px;
  /* overflow: hidden; */
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 0.2rem; */
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1rem 1rem;
`;
const Div5 = styled.div`
  background-color: #f9fafb;
`;
const Div = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 0.2rem; */
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1rem 2rem;
`;
function Grades() {
  const { subject } = useSubject();
  const { year } = useParams();
  const { subjectId } = useParams();
  // const {
  //   isLoading,
  //   data: cabins,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabin"],
  //   queryFn: () => apiCabins(year),
  // });
  // const { data: users } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => apiUsers(year),
  // });
  // console.log(users);
  // if (isLoading) return <Spinner />;
  const target = "subject";
  const { data: data2 } = useQuery({
    queryKey: ["quizGradeS"],
    queryFn: () => apiQuizAll(target, subjectId),
  });
  console.log(data2);
  return (
    <Div5>
      <Row>
        {/* <NavList>
          {cabins?.courses?.map((cabin) => (
            <SubjectRow cabin={cabin} key={cabin.id} />
          ))}
        </NavList> */}
        <NavList>
          {/* <Div>Student name</Div>
          <Div2>num</Div2>
          <div>{data2?.[0]?.course?.name}</div> */}
          {/* {data2?.map((cabin) => (
            <GradesTable cabin={cabin} key={cabin.id} />
          ))} */}
          {/* <Div>total</Div> */}
        </NavList>
        <GradesTable data2={data2} subject={subject?.data?.course} />
        {/* {users?.users?.map((user) => (
          <GradesRow user={user} key={user.id} />
        ))} */}
        <AddGrades />
      </Row>
    </Div5>
  );
}

export default Grades;
