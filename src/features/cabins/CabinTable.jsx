import styled from "styled-components";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { apiCabins } from "../../services/apiCabins";
import { useParams } from "react-router-dom";

const Table = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.1fr 4fr 0.2fr 4fr 3fr;
  column-gap: 2.2rem;
  align-items: center;

  background-color: #f9fafb;
  /* border-bottom: 1px solid #f3f4f6; */
  /* text-transform: uppercase; */
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1.4rem 2.2rem;
`;
const Div = styled.div`
  /* background-color: black; */
  /* border-right: 1px solid black; */
`;
function CabinTable() {
  const { year } = useParams();
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: () => apiCabins(year),
  });

  if (isLoading) return <Spinner />;
  console.log(cabins);

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <Div>course Name</Div>
        <div></div>
        <div>Instructor Name</div>

        <div></div>
      </TableHeader>

      {cabins?.courses?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
