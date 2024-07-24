import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../services/apiCabins";

export function useSubject() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { subjectId } = useParams();
  const {
    isLoading,
    data: subject,
    error,

    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: () => getSubjects(subjectId),
    retry: false,
  });
  // console.log(subjectId);
  return { isLoading, error, subject };
}
