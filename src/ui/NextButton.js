import styled from "styled-components";

const Button = styled.button`
  display: block;
  font-family: inherit;
  color: inherit;
  font-size: 2rem;
  border: 2px solid #495057;
  background-color: #495057;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.3s;
  float: right;
  &:not([disabled]):hover {
    background-color: #343a40;
  }
  &[disabled]:hover {
    cursor: not-allowed;
  }
`;
function NextButton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <Button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </Button>
    );

  if (index === numQuestions - 1)
    return (
      <Button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </Button>
    );
}

export default NextButton;
