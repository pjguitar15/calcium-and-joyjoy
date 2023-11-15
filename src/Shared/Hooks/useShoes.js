import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";
export function useGetShoes() {
  const getShoes = async () => {
    const res = await axiosInstance.get("/shoes");
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: "shoes",
    queryFn: getShoes,
  });

  return { data, isLoading };
}
