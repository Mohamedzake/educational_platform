import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: #fff;
  /* padding: 3.2rem 2.4rem; */
  padding: 3rem 2rem;
  border-right: 1px solid #f6f3f3;

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  /* gap: 3.2rem; */
  gap: 3rem;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
