import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";
export function useGetShoes(key = "shoes", params = {}) {
  const getShoes = async () => {
    const res = await axiosInstance.get("/shoes", {
      params,
    });
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: getShoes,
  });

  return { data, isLoading };
}
