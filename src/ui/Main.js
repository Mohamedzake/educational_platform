import styled from "styled-components";

const Maain = styled.main`
  width: 50rem;
`;

function Main({ children }) {
  return <Maain>{children}</Maain>;
}

export default Main;
