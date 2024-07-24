import Button from "../../ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import styled from "styled-components";
import { deleteUsers } from "../../services/apiUsers";
import CreateUserForm from "./CreateUserForm";
import toast from "react-hot-toast";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useEffect } from "react";
import { useSubject } from "../subjects/useSubject";
import { getCurrentUser } from "../../services/apiAuth";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 0fr 4fr 0fr 1fr;
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
function UserRow({ user }) {
  // eslint-disable-next-line react/prop-types
  const { _id: userId, name, email, image, number } = user;
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      toast.success("User successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  const { isLoading, data: user1 } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const instructor1 = user1?.data?.user?.role;

  return (
    <>
      <TableRow>
        <Img src={image || "/default-user.jpg"} />
        <Cabin>{name}</Cabin>
        <div></div>
        <div>{number}</div>
        <div></div>
        {instructor1 === "instructor" ? (
          <div></div>
        ) : (
          <Div>
            <Modal>
              <Modal.Open opens="edit">
                <Button>Edit</Button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateUserForm cabinToEdit={user} />
              </Modal.Window>

              <Modal.Open>
                <Button>delete</Button>
              </Modal.Open>
              <Modal.Window>
                <ConfirmDelete
                  resourceName="user"
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

export default UserRow;
