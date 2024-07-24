import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  console.log(user);
  // console.log(user?.data?.user?.role);
  return {
    isLoading,
    user,
    isAuthenticated: user?.data?.user?.role === "user",
    isAuthorization:
      user?.data?.user?.role === "admin" ||
      user?.data?.user?.role === "instructor",
  };
}
