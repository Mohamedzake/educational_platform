import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";

import toast from "react-hot-toast";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

import CreateQuizForm from "./CreateQuizForm";
import {
  deleteQuiz,
  deleteQuizDate,
  deleteQuizGrade,
} from "../../services/apiQuiz";
import QuizDateForm from "./QuizDateForm";
import QuizGradesForm from "./QuizGradesForm";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 6fr 0fr 1fr 1fr 0fr 1fr;
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
function QuizGradesRow({ date }) {
  // eslint-disable-next-line react/prop-types
  const { _id: userId, user, mark } = date;
  console.log();
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteQuizGrade,
    onSuccess: () => {
      toast.success("User successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["quizGrades"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Cabin>{user?.name}</Cabin>
        <div></div>
        <div></div>
        <div>{mark}</div>

        <div></div>
        <Div>
          <Modal>
            <Modal.Open opens="edit">
              <Button>Edit</Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <QuizGradesForm cabinToEdit={date} />
            </Modal.Window>

            <Modal.Open>
              <Button>delete</Button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                resourceName="grade"
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

export default QuizGradesRow;
