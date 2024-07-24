/* eslint-disable no-const-assign */
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  function tokenn() {
    queryClient.removeQueries();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <ButtonIcon onClick={tokenn}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
