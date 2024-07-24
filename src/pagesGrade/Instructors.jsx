import { useQuery } from "@tanstack/react-query";
import AddInstructors from "../features/instructors/AddInstructors";
import InstructorsTable from "../features/instructors/InstructorsTable";
import Row from "../ui/Row";
import { apiUsers } from "../services/apiUsers";
import { getCurrentUser } from "../services/apiAuth";

function Instructors() {
  const year = "general";

  const { data: users } = useQuery({
    queryKey: ["instructor"],
    queryFn: () => apiUsers(year),
  });
  console.log(users?.users);
  const { isLoading, data: user1 } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const instructor1 = user1?.data?.user?.role;
  return (
    <>
      <Row>
        <InstructorsTable users={users} />
        {instructor1 === "instructor" ? " " : <AddInstructors />}
        {/* <AddInstructors /> */}
      </Row>
    </>
  );
}

export default Instructors;
