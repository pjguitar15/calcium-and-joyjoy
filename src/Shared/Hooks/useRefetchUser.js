import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

export default function useRefetchUser() {
const refetchFn = async () => {
  try {
    const response = await axiosInstance.get("/user/me"); // Updated to the correct API endpoint
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


  const { data, isLoading, error, refetch } = useQuery("user", refetchFn);

  return { data, isLoading, error, refetch };
}
