import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  Row,
  Div,
  TableRow2,
  StyledNavLink,
  Button,
  Modal,
} from "your-component-library";
import { HiDocumentArrowDown } from "react-icons/hi";
import { deleteSubject } from "your-api";
import ConfirmDelete from "./ConfirmDelete";
import CreateSubjectForm from "./CreateSubjectForm";

export function SubjectTable({ subjectD }) {
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
  subjectD.forEach(({ _id: subjectId, type, file }) => {
    if (!filesByType[type]) {
      filesByType[type] = [];
    }
    filesByType[type].push({ subjectId, file });
  });

  return (
    <>
      {Object.entries(filesByType).map(([type, files]) => (
        <React.Fragment key={type}>
          <Row><Div>{type}</Div></Row>
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
