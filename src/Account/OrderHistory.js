import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Link
} from "@chakra-ui/react";
import { FaBox } from "react-icons/fa";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import axiosInstance from "../Shared/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cart";

function OrderHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBuyAgain = (order) => {
    order.items.forEach(item => {
      dispatch(addToCart({
        ...item.product,
        quantity: item.quantity,
        price: item.price
      }));
    });
  };

  const handleReturnRefund = () => {
    onOpen();
  };

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get("/user/orders", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

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
                <button 
                  className='border border-red-700 text-red-700 px-4 py-1 rounded-lg mr-2'
                  onClick={() => handleBuyAgain(order)}
                >
                  Buy again
                </button>
                <button 
                  className='border border-blue-700 text-blue-700 px-4 py-1 rounded-lg'
                  onClick={handleReturnRefund}
                >
                  Return/Refund
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      <ReturnRefundModal isOpen={isOpen} onClose={onClose} />
    </main>
  );
}

const ReturnRefundModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Return and Refund Policy</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text mb="4">
          We are currently not accepting returns or refunds. If you have any questions or concerns about your order, please feel free to contact us.
        </Text>
        <Text>
          Visit our Facebook page for more information:{" "}
          <Link
            href="https://www.facebook.com/calciumjoyjoyph27"
            isExternal
            color="blue.500"
          >
            calciumjoyjoyph27
          </Link>
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default OrderHistory;
