import styled from "styled-components";
import { HiDocumentArrowDown, HiDocumentPlus } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCabins } from "../../services/apiCabins";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CreateSubjectForm from "./CreateSubjectForm";
import CreateSubjectForm2 from "./CreateSubjectForm2";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { apiSubject, deleteSubject } from "../../services/apiSubjects";
import toast from "react-hot-toast";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteSubject2 } from "../../services/apiSubjects2";
import EditFile from "./EditFile";
import { getCurrentUser } from "../../services/apiAuth";
import { useSubject } from "./useSubject";
import { AiOutlineLink } from "react-icons/ai";
const StyledNavLink = styled(NavLink)`
  /* background-color: #639ec5; */
  display: grid;
  grid-template-columns: 2fr 0fr 2fr;
  /* border-radius: 10%; */
  &:link,
  &:visited {
    display: flex;
    align-items: center;

    gap: 1rem;
    color: #084269;

    font-size: 1rem;
    font-weight: 500;

    padding: 1rem 2rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #1f2937;
    background-color: #8ac1e5;

    border-radius: 5px;
  }

  & svg {
    width: 2rem;

    height: 2rem;
    /* color: #9ca3af; */
    color: #084269;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #4f46e5;
  }
`;

const Row = styled.div`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  font-size: 1.3rem;

  border-bottom: 10px solid #f9fafb;
`;
const Row2 = styled.div`
  font-size: 1.3rem;
`;
const Row1 = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 1fr 0.1fr 1fr;
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
  grid-template-columns: 5fr 4fr 1fr 1fr;
  column-gap: 2.2rem;
  align-items: center;
  padding: 1.2rem 2.2rem;

  &:not(:last-child) {
    border-bottom: 2px solid #f3f4f6;
  }
`;
// const Input = styled.input`
//   border: 1px solid #d1d5db;
//   background-color: #fff;
//   border-radius: 5px;
//   width: 10rem;
//   padding: 0.4rem 0.6rem;
//   margin: 3rem 1rem;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
// `;
function SubjectTable({ subjectD }) {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const { subject } = useSubject();
  console.log(subject?.data?.course?.instructor);
  const instructor1 = user?.data?.user?.name;
  const instructor2 = subject?.data?.course?.instructor;
  const instructor3 = user?.data?.user?.role;
  const user1 = user?.data?.user?.name;
  console.log(user1);

  const { _id: subjectId, type, materials } = subjectD;

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      toast.success("Subject successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["subject"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isDeletiing, mutate: deleteType } = useMutation({
    mutationFn: deleteSubject2,
    onSuccess: () => {
      toast.success("Subject successFully deleted");

      queryClient.invalidateQueries({
        queryKey: ["subject"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  console.log(materials);
  console.log(subjectId);
  return (
    <>
      <Row1>
        <div></div>
        <Div>{type}</Div>
        <Modal>
          {instructor1 === instructor2 ? (
            <>
              <Modal.Open opens="edit">
                <Button>Edit</Button>
              </Modal.Open>
              <Modal.Window name="edit">
                <CreateSubjectForm2 cabinToEdit={subjectD} />
              </Modal.Window>
              <div></div>
              <Modal.Open>
                <Button>delete</Button>
              </Modal.Open>
              <Modal.Window>
                <ConfirmDelete
                  resourceName="type"
                  disabled={isDeletiing}
                  onConfirm={() => deleteType(subjectId)}
                />
              </Modal.Window>
            </>
          ) : (
            ""
          )}
        </Modal>
      </Row1>
      <Row2>
        <Modal>
          {instructor1 === instructor2 || (user1 && type === "Task") ? (
            <>
              <Modal.Open opens="subject-form">
                <Button>
                  Uploade
                  <HiDocumentPlus />
                </Button>
              </Modal.Open>
              <Modal.Window name="subject-form">
                <CreateSubjectForm type={type} />
              </Modal.Window>
            </>
          ) : (
            ""
          )}
        </Modal>
      </Row2>
      {type !== "Meeting" ? (
        <Row>
          <TableRow2>
            {materials?.map(({ file, id, name }, index) => (
              <>
                <StyledNavLink to={file}>
                  <HiDocumentArrowDown />

                  <iframe
                    title="PDF Viewer"
                    src={file}
                    width="0%"
                    height="0px"
                  />
                  {name}
                </StyledNavLink>
                <div></div>

                <Modal>
                  {instructor1 === instructor2 || (user1 && type === "Task") ? (
                    <>
                      <Modal.Open opens="edit">
                        <Button>Edit</Button>
                      </Modal.Open>
                      <Modal.Window name="edit">
                        <CreateSubjectForm
                          type={type}
                          cabinToEdit={subjectD}
                          index={index}
                        />
                      </Modal.Window>

                      <Modal.Open>
                        <Button>delete</Button>
                      </Modal.Open>
                      <Modal.Window>
                        <ConfirmDelete
                          resourceName="item"
                          disabled={isDeleting}
                          onConfirm={() => mutate(id)}
                        />
                      </Modal.Window>
                    </>
                  ) : (
                    <>
                      <div></div>
                      <div></div>
                    </>
                  )}
                </Modal>
              </>
            ))}
          </TableRow2>
        </Row>
      ) : (
        <Row>
          <TableRow2>
            {materials?.map(({ file, id, name }, index) => (
              <>
                <StyledNavLink to={file}>
                  <AiOutlineLink />
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    {file}
                  </a>
                </StyledNavLink>
                <div></div>

                <Modal>
                  {instructor1 === instructor2 || (user1 && type === "Task") ? (
                    <>
                      <Modal.Open opens="edit">
                        <Button>Edit</Button>
                      </Modal.Open>
                      <Modal.Window name="edit">
                        <CreateSubjectForm
                          type={type}
                          cabinToEdit={subjectD}
                          index={index}
                        />
                      </Modal.Window>

                      <Modal.Open>
                        <Button>delete</Button>
                      </Modal.Open>
                      <Modal.Window>
                        <ConfirmDelete
                          resourceName="item"
                          disabled={isDeleting}
                          onConfirm={() => mutate(id)}
                        />
                      </Modal.Window>
                    </>
                  ) : (
                    <>
                      <div></div>
                      <div></div>
                    </>
                  )}
                </Modal>
              </>
            ))}
          </TableRow2>
        </Row>
      )}
    </>
  );
}

export default SubjectTable;
