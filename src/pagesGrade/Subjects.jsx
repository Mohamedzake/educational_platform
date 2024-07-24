import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { NavLink, useParams } from "react-router-dom";
import { apiCabins } from "../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import SubjectRow from "../features/subjects/SubjectRow";
import Spinner from "../ui/Spinner";

const NavList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  padding: 3rem;
  /* background-color: #0369a1; */
`;

function Subjects() {
  const { year } = useParams();
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin", year],
    queryFn: () => apiCabins(year),
  });

  console.log(cabins);
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        {/* <Heading as="h1">All Subjects</Heading> */}
      </Row>
      <NavList>
        {cabins?.courses?.map((cabin) => (
          <SubjectRow cabin={cabin} key={cabin.id} />
        ))}
      </NavList>
    </>
  );
}

export default Subjects;
