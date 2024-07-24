import { useEffect } from "react";
import styled from "styled-components";
const Div = styled.div`
  float: left;
  font-size: 1.8rem;
  color: var(--color-medium);
  border: 2px solid var(--color-dark);
  padding: 1.35rem 2.8rem;
  border-radius: 100px;
`;
function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <Div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </Div>
  );
}

export default Timer;
