import React from "react";
import { Box, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import axiosInstance from "../Shared/utils/axiosInstance";
import { FaBox } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get("/user/orders", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
  
      console.log("API Response:", res.data);
  
      const ordersArray = res.data.data || res.data;
      return ordersArray.filter(order => order.status === 'RECEIVED');
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const { data: orders, isLoading, isError } = useQuery("orders", getOrders);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !orders || orders.length < 1) return <Box>No order history.</Box>;

  return (
    <main className='pt-8 pe-8'>
      {orders.map((order, index) => {
        // Calculate the total quantity for each order
        const totalQuantity = order.items.reduce((total, item) => total + item.quantity, 0);

        return (
          <React.Fragment key={index}>
            <div className='rounded-lg border border-gray-700 p-6 mb-4'>
              <div className='flex gap-4 items-center mb-4'>
                <FaBox className='text-4xl text-lime-600' />
                <div>
                  <h5 className='font-semibold text-lg'>
                    Order Received - {order.estimated_delivery_date || 'Date not available'}
                  </h5>
                  <h6 className='font-normal text-lg'>
                    Reference: {order.reference_number}
                  </h6>
                </div>
              </div>

              <hr className='border-black my-4' />

              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className='flex justify-between items-end mb-4'>
                  <div className='flex items-center gap-5'>
                    <Image
                      className='w-[180px] h-[180px] object-cover rounded-lg'
                      src={item.product.image}
                      alt={item.product.name}
                    />
                    <div className='flex flex-col gap-2'>
                      <p className='text-md'>{item.product.name}</p>
                      <div className='bg-gray-100 px-3 py-2 rounded-lg text-gray-500'>
                        Category: {item.product.category.name}, Brand: {item.product.brand.name}, Size: {item.size}
                      </div>
                      <h6 className='font-semibold'>P{item.price}</h6>
                    </div>
                  </div>

                  <h6 className='text-gray-600'>Quantity: {item.quantity}</h6>
                </div>
              ))}

              <div className='text-gray-600 mb-4'>
                <h6>Total Quantity: {totalQuantity}</h6>
              </div>

              <div className='text-end my-4'>
                <h6 className='text-lg font-semibold'>Total: P{order.grand_total}</h6>
              </div>

              <div className='text-end'>
                <button className='border border-red-700 text-red-700 px-4 py-1 rounded-lg'>
                  Buy again
                </button>
                <ReviewModal />
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </main>
  );
}

export default OrderHistory;
