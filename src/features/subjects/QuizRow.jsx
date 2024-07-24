import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { deleteUsers } from "../../services/apiUsers";

import toast from "react-hot-toast";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useEffect } from "react";
import CreateQuizForm from "./CreateQuizForm";
import { deleteQuiz } from "../../services/apiQuiz";
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
function QuizRow({ questions }) {
  // eslint-disable-next-line react/prop-types
  const {
    _id: userId,
    question,
    correctOption,
    points,
    target,
    options,
  } = questions;
  console.log(options);
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      toast.success("User successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Cabin>{question}</Cabin>
        <div></div>

        <div>{target}</div>
        <div>{points}</div>
        <div></div>
        <Div>
          <Modal>
            <Modal.Open opens="edit">
              <Button>Edit</Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateQuizForm cabinToEdit={questions} />
            </Modal.Window>

            <Modal.Open>
              <Button>delete</Button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                resourceName="question"
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

export default QuizRow;
