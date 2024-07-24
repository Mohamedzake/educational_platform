import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 30rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    color: #6b7280;
    margin-bottom: 0.8rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
