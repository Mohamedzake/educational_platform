import styled from "styled-components";
const MyAppButton = styled.button`
  display: block;
  font-family: inherit;
  color: inherit;
  font-size: 1rem;
  border: 2px solid #495057;
  background-color: #495057;
  padding: 1.2rem 2.4rem;
  cursor: pointer;
  border-radius: 100px;
  transition: background-color 0.3s, color 0.3s;
  float: right;
  width: 100%;
  text-align: left;

  &:not([disabled]):hover {
    background-color: #343a40;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.MyAppButton-Option {
    &:not([disabled]):hover {
      color: #f1f3f5;
    }

    /* &.correct {
      background-color: #1098ad;
      border-color: #1098ad;
      color: #f1f3f5;
    }

    &.wrong {
      background-color: #ffa94d;
      border-color: #ffa94d;
      color: #343a40;
    } */
    &.answer {
      background-color: #1098ad;
      border-color: #1098ad;
      color: #f1f3f5;
      /* transform: translateX(2rem); */
    }
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 3.2rem;
`;
function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <Div className="options">
      {question.options.map((option, index) => (
        <>
          {option === "" ? (
            ""
          ) : (
            <MyAppButton
              className={`MyAppButton-Option ${
                index === answer ? "answer" : ""
              } ${
                hasAnswered
                  ? index === question.correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              key={option}
              disabled={hasAnswered}
              onClick={() => dispatch({ type: "newAnswer", payload: index })}
            >
              {option}
            </MyAppButton>
          )}
        </>
      ))}
    </Div>
  );
}

export default Options;
