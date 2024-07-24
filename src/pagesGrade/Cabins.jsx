// import { Button } from "@mui/material";

import CabinTable from "../features/cabins/CabinTable";

import Row from "../ui/Row";

import AddCabin from "../features/cabins/AddCabin";
import { getCurrentUser } from "../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

function Cabins() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const instructor1 = user?.data?.user?.role;

  return (
    <>
      <Row>
        <CabinTable />
        {instructor1 === "instructor" ? "" : <AddCabin />}
      </Row>
    </>
  );
}

export default Cabins;
