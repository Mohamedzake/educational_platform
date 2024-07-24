import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  color: #4b5563;
`;

const Avatar = styled.img`
  display: block;
  width: 3rem;
  width: 3rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid #f3f4f6;
`;

function UserAvatar() {
  const { user } = useUser();

  const { name, image } = user?.data?.user;
  console.log(name, image);
  return (
    <StyledUserAvatar>
      <Avatar src={image || "/default-user.jpg"} alt={`Avatar of ${name}`} />
      <span>{name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
