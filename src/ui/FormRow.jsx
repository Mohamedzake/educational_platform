/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;

  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "22rem 1fr 1fr"};
  gap: ${(props) => (props.orientation === "vertical" ? "0.6rem" : "2.2rem")};

  padding: 1rem 2rem;

  &:first-child {
    padding-top: 2rem;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${(props) =>
      props.orientation === "vertical" ? "none" : "1px solid  #f3f4f6"};
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  ${(props) =>
    props.orientation !== "vertical" &&
    css`
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1rem;
  color: #b91c1c;
`;
//////////////////////////////////
// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 20rem 0.8fr 1fr;
//   gap: 2rem;

//   padding: 1rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid #f3f4f6;
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 0.8rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1rem;
//   color: #b91c1c;
// `;
// eslint-disable-next-line react/prop-types
function FormRow({ label, error, children, orientation }) {
  return (
    <StyledFormRow orientation={orientation}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
