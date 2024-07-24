import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
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
const H1 = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;
const H2 = styled.h2`
  font-size: 3.6rem;
  margin-bottom: 2rem;
`;
const H3 = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;
function StartScreen({
  numQuestions,
  dispatch,
  currentDateTime,
  providedDateTime,
  endDateTime,
}) {
  const formattedCurrentDateTime = currentDateTime.toLocaleString();
  const formattedProvidedDateTime = providedDateTime.toLocaleString();
  const formattedEndDateTime = endDateTime.toLocaleString();
  console.log(currentDateTime);
  return (
    <Div>
      <H2>Welcome to The your quiz!</H2>
      {/* <div>{providedDateTime}</div> */}
      {!isNaN(endDateTime.getTime()) ? (
        <>
          {currentDateTime >= providedDateTime &&
          currentDateTime <= endDateTime ? (
            <>
              <H3>{numQuestions} questions for you</H3>
              <Button onClick={() => dispatch({ type: "start" })}>
                Let's start
              </Button>
            </>
          ) : (
            <H1>
              The quiz is close now and will :
              <h3> start at : {formattedProvidedDateTime}</h3>
              <h3> end at : {formattedEndDateTime}</h3>
            </H1>
          )}
        </>
      ) : (
        <>
          <H3>{numQuestions} questions for you</H3>
          <Button onClick={() => dispatch({ type: "start" })}>
            Let's start
          </Button>
        </>
      )}
    </Div>
  );
}

export default StartScreen;
