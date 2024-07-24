import styled from "styled-components";

import { useParams } from "react-router-dom";
import { useState } from "react";
import GradesRow from "./GradesRow";
import { apiUsers } from "../../services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useSubject } from "../subjects/useSubject";
const Table = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 2.1fr 1.5fr 0.3fr 2.5fr;
  column-gap: 0.2rem;
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  /* text-transform: uppercase; */
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #0369a1;
  /* color: #4b5563; */
  /* padding: 1rem 1rem; */
  padding: 1.4rem 2.4rem;
`;
const H1 = styled.h1`
  /* margin-left: 2rem; */
`;
function GradesTable({ data2, subject = {} }) {
  const { name: name1, image, _id: ids } = subject;
  const [count, setCount] = useState(1);
  // console.log(query);

  const { year } = useParams();
  // const { name } = data2;
  console.log();
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiUsers(year),
  });
  console.log(users);
  // console.log(cabin);
  // if (isLoading) return <Spinner />;
  // console.log(users?.users?.length);
  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Student name</div>
        <div>number</div>
        <div></div>
        <div>
          <h1>{name1}</h1>
          <H1>(mark)</H1>
        </div>
      </TableHeader>
      {/* <div>{subject?.data?.course}</div> */}
      {/* {users?.users?.map((user) => (
        <GradesRow user={user} key={user.id} />
      ))} */}
      {data2?.map((data2) => (
        <GradesRow data2={data2} key={data2.id} />
      ))}
    </Table>
  );
}

export default GradesTable;
