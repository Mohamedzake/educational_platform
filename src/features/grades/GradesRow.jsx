import Button from "../../ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { deleteUsers } from "../../services/apiUsers";

import toast from "react-hot-toast";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

import CreateGradesForm from "./CreateGradesForm";
import { deleteQuizGrade } from "../../services/apiQuiz";
import { getCurrentUser } from "../../services/apiAuth";
const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 3.8fr 2fr 3fr 3fr 2fr 1fr 2.2fr 2.2fr 1fr; */
  /* grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr 1fr 0.9fr 0.5fr 0.5fr 0.1fr; */
  grid-template-columns: 2.9fr 1fr 1.5fr 2.5fr 1fr 1fr;
  /* column-gap: 1rem; */
  align-items: center;
  padding: 1rem 1rem;
  background-color: #f9fafb;
  /* border-bottom: 4px solid #1d56ca; */
  &:not(:last-child) {
    border-bottom: 1px solid #b6bfd2;
  }
`;
const Div = styled.div`
  display: flex;
  /* display: grid;
  grid-template-columns: 1fr; */
  gap: 1rem;
`;
const Cabin = styled.div`
  /* border: 1px solid #e5e7eb; */
  font-size: 1.5rem;
  font-weight: 600;
  color: #4b5563;
  padding: 0.2rem 0.2rem;
  color: black;
  font-family: "Sono";
  /* margin-right: 0rem; */
  margin-left: 8rem;
`;
const Cabin2 = styled.div`
  /* border: 1px solid #e5e7eb; */
  font-size: 1.5rem;
  font-weight: 600;
  color: #4b5563;

  color: black;
  font-family: "Sono";
`;
const Div1 = styled.div`
  /* margin-right: 9rem; */
`;
// eslint-disable-next-line react/prop-types
function GradesRow({ data2 }) {
  // console.log(user);
  console.log(data2);
  // eslint-disable-next-line react/prop-types
  const { _id: userId, number, mark } = data2;

  // console.log(name);
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteQuizGrade,
    onSuccess: () => {
      toast.success("User successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["quizGradeS"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const user1 = user?.data?.user?.role;
  return (
    <>
      <TableRow>
        {/* <Img src={image || "/default-user.jpg"} /> */}
        <Cabin2>{data2?.user?.name}</Cabin2>
        <div></div>
        <Cabin2>{data2.user.number}</Cabin2>
        <Cabin>{mark}</Cabin>
        <div></div>
        {/* <div></div> */}
        {/* <div>50</div>
        <div>50</div>
        <div>50</div>
        <Div1>50</Div1>
        <div>500</div> */}
        {user1 === "user" ? (
          ""
        ) : (
          <Div>
            <Modal>
              <Modal.Open opens="edit">
                <Button>Edit</Button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateGradesForm cabinToEdit={data2} />
              </Modal.Window>

              <Modal.Open>
                <Button>delete</Button>
              </Modal.Open>
              <Modal.Window>
                <ConfirmDelete
                  resourceName="mark"
                  disabled={isDeleting}
                  onConfirm={() => mutate(userId)}
                />
              </Modal.Window>
            </Modal>
          </Div>
        )}
      </TableRow>
    </>
  );
}

export default GradesRow;
