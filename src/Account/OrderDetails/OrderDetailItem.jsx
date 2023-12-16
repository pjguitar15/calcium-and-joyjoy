import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

const OrderDetailItem = (props) => {
  const { orderItems } = props;
  const { status, id } = orderItems;

  console.log(id);
  console.log(orderItems);

  return (
    <div className='rounded-lg border border-gray-700 p-6'>
      <div className='flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-yellow-500 rounded-full text-white w-14 h-14 flex items-center justify-center'>
            <FaCheck className='text-white text-2xl' />
          </div>
          <h6 className='font-semibold text-lg mt-1'>Checkout</h6>
        </div>
        <div className='w-[160px] h-[3px] bg-yellow-500 mb-7 -ms-4 -me-4'></div>
        <div className='flex flex-col justify-center items-center'>
          <div className='bg-yellow-500 rounded-full text-white w-14 h-14 flex items-center justify-center'>
            <FaCheck className='text-white text-2xl' />
          </div>
          <h6 className='font-semibold text-lg mt-1'>Pending</h6>
        </div>
        <div className='w-[160px] h-[3px] bg-yellow-500 mb-7 -ms-4 -me-1'></div>
        {/* {props.orderItems.delivery_status ?} */}
        <div
          className={`flex flex-col justify-center items-center ${
            status == "SHIPPED" || status == "paid" ? "" : "opacity-20"
          }`}
        >
          <div
            className={`bg-yellow-500 rounded-full text-white w-14 h-14 flex items-center justify-center`}
          >
            <FaCheck className='text-white text-2xl' />
          </div>
          <h6 className='font-semibold text-lg mt-1'>Payment</h6>
        </div>

        <div className='w-[160px] h-[3px] bg-yellow-500 mb-7 -ms-4 -me-1'></div>
        {/* {props.orderItems.delivery_status ?} */}
        <div
          className={`flex flex-col justify-center items-center ${
            status == "SHIPPED" ? "" : "opacity-20"
          } `}
        >
          <div
            className={`bg-yellow-500 rounded-full text-white w-14 h-14 flex items-center justify-center`}
          >
            <FaCheck className='text-white text-2xl' />
          </div>
          <h6 className='font-semibold text-lg mt-1'>Shipped</h6>
        </div>
      </div>
      <hr className='border-black mt-6' />
      {/* Order Items */}
      <div className='flex flex-col justify-between'>
        {props.orderItems.items?.map((item, index) => (
          <div key={index} className='flex items-center gap-5 mt-7'>
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
              <h6 className='font-semibold'>P{item.price}</h6>
            </div>
          </div>
        ))}

        <h6 className='text-gray-600'>
          Quantity: {props.orderItems.items.length}
        </h6>
      </div>
      <div className='text-end my-4'>
        <h6 className='text-lg font-semibold'>
          Total: P
          {props.orderItems.grand_total.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h6>
      </div>
      {/* <div className="text-end">
        <button className="border border-red-700 text-red-700 px-4 py-1 rounded-lg">
          Cancel
        </button>
        <button className="border border-black text-black px-4 py-1 rounded-lg ms-2">
          View Item
        </button>
      </div> */}
    </div>
  );
};

export default OrderDetailItem;
