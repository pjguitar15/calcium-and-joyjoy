import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

export default async function useRefetchUser() {
  const refetchFn = async () => {
    axiosInstance.get("");
  };
  const { data, isLoading } = useQuery({
    queryKey: "user",
    queryFn: refetchFn,
  });

  return { data, isLoading };
}
