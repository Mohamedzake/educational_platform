import { useParams } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 4fr 4fr 4fr 3fr 2fr;

  background-color: #fff;

  padding: 1rem 4.2rem;
  font-size: 2rem;
  color: #1f2937;

  border-bottom: 1px solid #f6f3f3;
`;
function Header() {
  const { year } = useParams();
  return (
    <StyledHeader>
      <span
        style={{
          marginTop: "1rem",
          fontStyle: "italic",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {year}-year
      </span>
      {/* {year}-year */}
      <div></div>
      <div></div>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
