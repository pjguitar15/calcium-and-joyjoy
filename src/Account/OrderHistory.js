import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  Badge,
  Icon,
  Heading,
  Center
} from "@chakra-ui/react";
import { FaBox, FaRedo, FaShoppingCart, FaSadTear, FaShoppingBag } from "react-icons/fa";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import axiosInstance from "../Shared/utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cart";
import { Link as RouterLink } from 'react-router-dom';


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
  if (isError || !orders || orders.length < 1) {
    return (
      <Center flexDirection="column" height="80vh">
        <Icon as={FaSadTear} w={10} h={10} color="gray.400" />
        <Text fontSize="xl" mt={3}>You have no order history yet.</Text>
        <Button as={RouterLink} to='/' colorScheme="blue" mt="32px">
          <Icon as={FaShoppingBag} mr={2} />
          Browse Products
        </Button>
      </Center>
    );
  }
  return (
    
    <main className="py-8 pe-8 overflow-y-scroll max-h-[800px] flex flex-col gap-3">
          <Heading as="h2" size="xl" mb={6}>Order History</Heading>
      {orders.map((order, index) => {
        const totalQuantity = order.items.reduce((total, item) => total + item.quantity, 0);

        return (
          <Box key={index} bg="white" rounded="lg" border="1px" borderColor="black" p={6} shadow="sm" mb={4}>
            <HStack spacing={4} align="center" mb={4}>
              <Icon as={FaBox} w={8} h={8} color="green.500" />
              <VStack align="start">
                <Text fontWeight="semibold" fontSize="lg">
                  Order Received - {order.estimated_delivery_date || 'Date not available'}
                </Text>
                <Text fontSize="md">Reference: {order.reference_number}</Text>
              </VStack>
            </HStack>

            <Divider my={4} />

            {order.items.map((item, itemIndex) => (
              <VStack key={itemIndex} align="stretch" mb={4}>
                <HStack spacing={4}>
                  <Image boxSize="100px" objectFit="cover" rounded="md" src={item.product.image} alt={item.product.name} />
                  <VStack align="start" flex="1">
                    <Text fontWeight="semibold">{item.product.name}</Text>
                    <Badge colorScheme="gray" p={1} rounded="md">
                      {item.product.category.name} • {item.product.brand.name} • Size: {item.size}
                    </Badge>
                    <Text fontWeight="semibold" color="green.500">P{item.price}</Text>
                  </VStack>
                  <Text>Qty: {item.quantity}</Text>
                </HStack>
              </VStack>
            ))}

            <Divider my={4} />

            <HStack justifyContent="space-between" mb={4}>
              <Text>Total Quantity:</Text>
              <Text fontWeight="semibold">{totalQuantity}</Text>
            </HStack>

            <HStack justifyContent="space-between" mb={4}>
              <Text fontWeight="semibold" fontSize="lg">Total:</Text>
              <Text fontWeight="semibold" fontSize="lg" color="green.500">
                P{order.grand_total}
              </Text>
            </HStack>

            <HStack justifyContent="flex-end">
              <Button leftIcon={<FaShoppingCart />} colorScheme="blue" variant="solid" size="sm" onClick={() => handleBuyAgain(order)}>
                Buy again
              </Button>
              <Button leftIcon={<FaRedo />} colorScheme="red" variant="solid" size="sm" ml={2} onClick={handleReturnRefund}>
                Return/Refund
              </Button>
            </HStack>
          </Box>
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
