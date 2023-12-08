import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import axiosInstance from "../Shared/utils/axiosInstance";
function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));

  const getOrders = async () => {
    const res = await axiosInstance.get("/user/order", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    return res.data;
  };
  const { data: orders, isLoading } = useQuery("orders", getOrders);
  if (isLoading) return <LoadingSpinner />;
  if (orders.length < 1) return <Box>No order history.</Box>;

  return <Box>List of orders here</Box>;
}

export default OrderHistory;
