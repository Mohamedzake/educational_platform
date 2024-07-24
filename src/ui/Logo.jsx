import styled from "styled-components";

const StyledLogo = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  text-align: center;
`;

const Img = styled.img`
  height: 8rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      {/* <Img src="/logo-light.png" alt="Logo" />     */}
      <Img src="/AL-AZHAR UNIVERSITY.jpg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
