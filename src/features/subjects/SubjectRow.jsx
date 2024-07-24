import { Button } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  background-color: #e5e7eb;
  /* border-radius: 5%; */
  /* padding: 1rem; */
`;
const Img = styled.img`
  display: block;
  height: 10rem;
  width: 37rem;
`;
const Div = styled.div`
  color: black;

  /* background-color: aliceblue; */
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4rem;
`;
//  --color-grey-0: #fff;
// --color-grey-50: #f9fafb;
// --color-grey-100: #f3f4f6;
// --color-grey-200: #e5e7eb;
// --color-grey-300: #d1d5db;
// --color-grey-400: #9ca3af;
function SubjectRow({ cabin }) {
  const navigate = useNavigate();
  const { image, _id: subjectId, name } = cabin;
  const { year } = useParams();
  return (
    <>
      <Button
        id={subjectId}
        onClick={() => navigate(`/${year}/subjects/${subjectId}`)}
      >
        <StyledNavLink>
          <Img src={image || "/default-image.jpg"} />
          <Div>{name}</Div>
        </StyledNavLink>
      </Button>
    </>
  );
}

export default SubjectRow;
