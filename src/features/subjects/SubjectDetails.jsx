import styled from "styled-components";

import { apiBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import { useSubject } from "./useSubject";
import SubjectDetailsBox from "./SubjectDetailsBox";
const Div = styled.div`
  background-color: #fff;
`;
function SubjectDetails() {
  const { subject, isLoading } = useSubject();

  console.log(subject);
  if (isLoading) return <Spinner />;

  return (
    <Div>
      <SubjectDetailsBox subject={subject?.data?.course} />
    </Div>
  );
}

export default SubjectDetails;
