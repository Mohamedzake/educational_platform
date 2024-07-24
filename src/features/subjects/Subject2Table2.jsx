import styled from "styled-components";
import { HiDocumentArrowDown } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCabins } from "../../services/apiCabins";
import { NavLink } from "react-router-dom";
import CreateSubjectForm from "./CreateSubjectForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { deleteSubject } from "../../services/apiSubjects";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
import React from "react";
const StyledNavLink = styled(NavLink)`
  background-color: #639ec5;
  border-radius: 10%;
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    /* gap: 1.2rem; */
    gap: 1rem;
    color: #4b5563;
    /* font-size: 1.6rem; */
    font-size: 1rem;
    font-weight: 500;
    /* padding: 1.2rem 2.4rem; */
    padding: 1rem 2rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #1f2937;
    background-color: #8ac1e5;
    /* background-color: #f9fafb; */
    border-radius: 5px;
  }

  & svg {
    /* width: 2.4rem; */
    width: 2rem;
    /* height: 2.4rem; */
    height: 2rem;
    color: #9ca3af;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #4f46e5;
  }
`;
const Table = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.2rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 0fr 2fr 1fr 1fr;
  column-gap: 2.2rem;
  align-items: center;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
  padding: 1.4rem 2.2rem;
`;
const Row = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  font-size: 1.3rem;
  /* padding: 1rem 1rem 2rem 1rem; */
  border-bottom: 10px solid #f9fafb;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  color: #4338ca;
  font-size: 1.5rem;
  font-weight: 600;
`;
const TableRow2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  column-gap: 2.2rem;
  align-items: center;
  padding: 1.2rem 2.2rem;

  &:not(:last-child) {
    border-bottom: 2px solid #f3f4f6;
  }
`;
const Input = styled.input`
  border: 1px solid #d1d5db;
  background-color: #fff;
  border-radius: 5px;
  width: 10rem;
  padding: 0.4rem 0.6rem;
  margin: 3rem 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;
function Subject2Table2({ subjectD }) {
  const { _id: subjectId, type, file } = subjectD;
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      toast.success("Subject successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["subject"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  // Group files by type
  const filesByType = {};

  subjectD?.forEach(({ _id: subjectId, type, file }) => {
    console.log("type:", type);
    if (!filesByType[type]) {
      filesByType[type] = [];
    }
    filesByType[type].push({ subjectId, file });
  });
  return (
    <>
      {Object.entries(filesByType).map(([type, files]) => (
        <React.Fragment key={type}>
          <Row>
            <Div>{type}</Div>
          </Row>
          {files.map(({ subjectId, file }) => (
            <Row key={subjectId}>
              <TableRow2>
                <StyledNavLink to={file}>
                  view <HiDocumentArrowDown />
                </StyledNavLink>
                <div></div>
                <Modal>
                  <Modal.Open opens="edit">
                    <Button>Edit</Button>
                  </Modal.Open>
                  <Modal.Window name="edit">
                    <CreateSubjectForm
                      cabinToEdit={{ _id: subjectId, type, file }}
                    />
                  </Modal.Window>

                  <Modal.Open>
                    <Button>Delete</Button>
                  </Modal.Open>
                  <Modal.Window>
                    <ConfirmDelete
                      resourceName="subject"
                      disabled={isDeleting}
                      onConfirm={() => mutate(subjectId)}
                    />
                  </Modal.Window>
                </Modal>
              </TableRow2>
            </Row>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

export default Subject2Table2;
