import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user.data.user.year);
      queryClient.setQueryData(["user"], user.user);
      console.log(user?.data?.user?.role);
      const admin = user?.data?.user?.role === "admin";
      const instructor = user?.data?.user?.role === "instructor";
      <>
        {admin || instructor
          ? navigate(`/home`, { replace: true })
          : navigate(`/${user?.data?.user?.year}/subjects`, { replace: true })}
      </>;
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
