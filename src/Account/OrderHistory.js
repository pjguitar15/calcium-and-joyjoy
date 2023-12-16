import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import axiosInstance from "../Shared/utils/axiosInstance";
import { FaBox } from "react-icons/fa";
import ReviewModal from "./ReviewModal";
function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));

  const getOrders = async () => {
    const res = await axiosInstance.get("/user/orders", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    return res.data;
  };
  const { data: orders, isLoading } = useQuery("orders", getOrders);
  if (isLoading) return <LoadingSpinner />;
  if (!orders || orders.length < 1) return <Box>No order history.</Box>;

  return (
    <main className='pt-8 pe-8'>
      <div className='rounded-lg border border-gray-700 p-6'>
        <div className='flex gap-4 items-center'>
          <FaBox className='text-4xl text-lime-600' />
          <div>
            <h5 className='font-semibold text-lg'>
              Nov 15 - Item has been delivered
            </h5>
            <h5 className='font-normal text-lg'>
              Orders have been received, please leave a review.
            </h5>
          </div>
        </div>
        <hr className='border-black my-4' />
        <div className='flex justify-between items-end'>
          <div className='flex items-center gap-5 mt-7'>
            <div>
              <img
                className='w-[180px] h-[180px] object-cover rounded-lg'
                src='https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5ab0a6c-6393-4af6-abbc-4f1acaa6ed94/air-max-dawn-shoes-tx7TpB.png'
                alt=''
              />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-md'>Air Force 1 White</p>
              <div className='bg-gray-100 px-3 py-2 rounded-lg text-gray-500'>
                Men/Women's Shoes, Cloud White/, Size 9
              </div>
              <h6 className='font-semibold'>P5,495.00</h6>
            </div>
          </div>

          <h6 className='text-gray-600'>Quantity: 6</h6>
        </div>

        <div className='text-end my-4'>
          <h6 className='text-lg font-semibold'>Total: P5,495.00</h6>
        </div>

        <div className='text-end'>
          <button className='border border-red-700 text-red-700 px-4 py-1 rounded-lg'>
            Buy again
          </button>
          {/* <button className="border border-red-700 text-red-700 px-4 py-1 rounded-lg ms-2">
            Review
          </button> */}
          <ReviewModal />
        </div>
      </div>
    </main>
  );
}

export default OrderHistory;
