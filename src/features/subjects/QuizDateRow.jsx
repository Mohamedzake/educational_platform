import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";

import toast from "react-hot-toast";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

import CreateQuizForm from "./CreateQuizForm";
import { deleteQuiz, deleteQuizDate } from "../../services/apiQuiz";
import QuizDateForm from "./QuizDateForm";
const TableRow = styled.div`
  display: grid;
  /* grid-template-columns: 3fr 0.5fr 1.5fr 2fr 0fr 1fr; */
  grid-template-columns: 5fr 1fr 3.3fr 3.4fr 2.3fr 0.5fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 2px solid #f3f4f6;
  }
`;
const Div = styled.div`
  display: flex;
  gap: 1rem;
`;
const Cabin = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4b5563;
  font-family: "Sono";
`;
const Img = styled.img`
  background-color: #bfc8a2;
  display: block;

  width: 6.2rem;
  object-fit: cover;
  aspect-ratio: 3 / 2;
  border-radius: 0%;

  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
// eslint-disable-next-line react/prop-types
function QuizDateRow({ date }) {
  // eslint-disable-next-line react/prop-types
  const { _id: userId, date: date2, startTime, endTime, time } = date;
  console.log();
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteQuizDate,
    onSuccess: () => {
      toast.success("User successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["quizDate"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Cabin>{date2}</Cabin>
        <div></div>
        <div>{time}</div>

        <div>{startTime}</div>
        <div>{endTime}</div>
        <div></div>
        <Div>
          <Modal>
            <Modal.Open opens="edit">
              <Button>Edit</Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <QuizDateForm cabinToEdit={date} />
            </Modal.Window>

            <Modal.Open>
              <Button>delete</Button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                resourceName="date"
                disabled={isDeleting}
                onConfirm={() => mutate(userId)}
              />
            </Modal.Window>
          </Modal>
        </Div>
      </TableRow>
    </>
  );
}

export default QuizDateRow;
