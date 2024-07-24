import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserTable from "../features/users/UserTable";

import AddUser from "../features/users/AddUser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUsers } from "../services/apiUsers";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import { useSubject } from "../features/subjects/useSubject";
const Input = styled.input`
  /* height: 3rem;
  border: 2px solid #fff;
  margin-bottom: 1rem; */
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #66afe9;
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
    outline: none;
  }

  &:hover {
    border-color: #888;
  }
`;
function Users() {
  const { year } = useParams();

  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await apiUsers(year, searchName);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [searchName, year]);
  // const { data: data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: apiUsers,
  // });
  console.log(users);
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const instructor1 = user?.data?.user?.role;

  return (
    <>
      <Row type="horizontal">
        {/* <Heading as="h1">All Users</Heading> */}
        <div></div>
        <div>
          <Input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by name"
          />
        </div>
      </Row>
      <Row>
        <UserTable users={users} />
        {instructor1 === "instructor" ? "" : <AddUser />}
      </Row>
    </>
  );
}

export default Users;
