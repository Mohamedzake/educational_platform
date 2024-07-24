import styled from "styled-components";
import Options from "./Options";
const H4 = styled.h4`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2.4rem;
`;
function Question({ question, dispatch, answer }) {
  // const question = questions.at(index);

  // console.log(question?.options);
  // console.log(question);
  return (
    <div>
      <H4>{question.question}</H4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
