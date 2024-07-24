import styled from "styled-components";
import CreateUserForm1 from "../features/users/CreateUserForm1";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import CreateUserForm2 from "../features/users/CreateCabinForm2";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 4fr 0.6fr;
  /* background-color: #0369a1; */
  background-color: #374151;
  column-gap: 0.6rem;
  align-items: center;
  /* margin-top: 5rem; */

  margin-bottom: 2rem;
  color: #fff;
  padding: 1rem 1rem 2rem 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;
const Img = styled.img`
  display: block;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;
const Header = styled.header`
  font-size: 2rem;
`;
function Profile() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
  // console.log();
  const userId = user?.data?.user;
  console.log(userId);
  return (
    <>
      <TableRow>
        <Img src={user?.data?.user?.image || "/default-user.jpg"} />

        <Header>{user?.data?.user?.name}</Header>
      </TableRow>
      <Heading as="h1">Update your account</Heading>
      <Row>
        <Heading as="h3">Update user data</Heading>
        <CreateUserForm1 cabinToEdit={userId} />
      </Row>
      <Row>
        <Heading as="h3">Update password</Heading>
        <CreateUserForm2 cabinToEdit={userId} />
      </Row>
    </>
  );
}

export default Profile;
