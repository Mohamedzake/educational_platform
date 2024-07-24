import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { apiUsers } from "../../services/apiUsers";
import MenuIntroduction from "../../components/common/MenuIntroduction";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InstructorsRow from "./InstructorsRow";

const Table = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0fr 2fr 2fr 2fr 1fr 1fr;
  column-gap: 2.2rem;
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  /* text-transform: uppercase; */
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1.4rem 2.2rem;
`;

function InstructorsTable(users) {
  const [count, setCount] = useState(1);
  // console.log(query);

  // const { year } = useParams();

  // const {
  //   isLoading,
  //   data: users,
  //   error,
  // } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => apiUsers(year),
  // });

  console.log(users);
  // if (isLoading) return <Spinner />;
  // console.log(users?.users?.length);
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>instructor name</div>
        <div></div>
        <div></div>

        <div></div>
        <div></div>
      </TableHeader>
      {users?.users?.users?.map((user) => (
        <InstructorsRow
          user={user}
          key={user.id}
          count={count}
          setCount={setCount}
        />
      ))}
    </Table>
  );
}

export default InstructorsTable;
