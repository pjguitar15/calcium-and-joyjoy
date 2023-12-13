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
    const shoesOnly = res.data.filter((item) => item.category?.name === "Shoes" || item.category?.product_category_id === "1")
    return shoesOnly;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["shoes", queryObj],
    queryFn: getShoes,
  });

  return { data, isLoading };
}
