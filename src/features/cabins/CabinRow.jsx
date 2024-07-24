import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabins } from "../../services/apiCabins";

// import { Button } from "@mui/material";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useSubject } from "../subjects/useSubject";
import { getCurrentUser } from "../../services/apiAuth";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 0fr 4fr 0fr 1fr;
  column-gap: 2.2rem;
  align-items: center;
  padding: 1.2rem 2.2rem;

  &:not(:last-child) {
    border-bottom: 2px solid #f3f4f6;
  }
`;
const Img = styled.img`
  /* background-color: #a16207; */
  display: block;
  width: 6.2rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #4b5563;
  font-family: "Sono";
`;
const Div = styled.div`
  display: flex;
  gap: 1rem;
`;

// eslint-disable-next-line react/prop-types
function CabinRow({ cabin }) {
  // eslint-disable-next-line react/prop-types

  const { image, _id: cabinId, name, year, instructor } = cabin;
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("Subject successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const instructor1 = user?.data?.user?.role;

  return (
    <>
      <TableRow>
        <Img src={image || "/default-user.jpg"} />
        <Cabin>{name}</Cabin>
        <div></div>
        {instructor ? <Cabin>{instructor}</Cabin> : <span>&mdash;</span>}
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
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Open>
                <Button>delete</Button>
              </Modal.Open>
              <Modal.Window>
                <ConfirmDelete
                  resourceName="course"
                  disabled={isDeleting}
                  onConfirm={() => mutate(cabinId)}
                />
              </Modal.Window>
            </Modal>
          </Div>
        )}
      </TableRow>
    </>
  );
}

export default CabinRow;
