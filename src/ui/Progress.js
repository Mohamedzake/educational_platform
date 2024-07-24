import styled from "styled-components";

const Header = styled.header`
  margin-bottom: 4rem;
  display: grid;
  justify-content: space-between;
  gap: 1.2rem;
  grid-template-columns: auto auto;
  font-size: 1.8rem;
  color: #ced4da;
`;
const Pprogress = styled.progress`
  /* -webkit-appearance: none; */
  width: 100%;
  height: 12px;
  grid-column: 1 / -1;
  /* ::-webkit-progress-bar { */
  background-color: #ced4da;
  border-radius: 100px;
  /* } */
  /* ::-webkit-progress-value { */
  /* background-color: #1098ad; */
  border-radius: 100px;
  /* } */
`;

function Progress({ numQuestions, index, points, maxPossiblePoints, answer }) {
  return (
    <Header className="progress">
      <Pprogress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      {/* <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p> */}
    </Header>
  );
}

export default Progress;
