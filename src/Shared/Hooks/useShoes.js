import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
export function useGetShoes() {
  const [searchParams] = useSearchParams();
  const queryObj = {};
  for (const [key, value] of searchParams.entries()) {
    queryObj[key] = value;
  }
  const getShoes = async () => {
    const res = await axiosInstance.get("/shoes", {
      params: queryObj,
    });
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["shoes", queryObj],
    queryFn: getShoes,
  });

  return { data, isLoading };
}
