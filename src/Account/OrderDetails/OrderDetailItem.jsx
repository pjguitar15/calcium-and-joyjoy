import React from 'react';
import { Box, Button, VStack, HStack, Text, Link, Image, Center, useColorModeValue, Divider } from "@chakra-ui/react";
import { FaCheck, FaShoppingCart, FaClock, FaCreditCard, FaTruck } from "react-icons/fa";

const OrderDetailItem = ({ orderItems, onReceived }) => {
  const { items, status, reference_number, tracking_url, tracking_number, payment_status, estimated_delivery_date } = orderItems;
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  const StatusLine = ({ isActive }) => (
    <Center height="4px" width="160px">
      <Box height="4px" bg={isActive ? "green.500" : "gray.300"} width="100%" mt="2" mb="10" />
    </Center>
  );

  const statusColor = useColorModeValue({
    checkout: "green.500",
    pending: "yellow.500",
    payment: "blue.500",
    shipped: "red.500",
  });

  const statusIcon = {
    checkout: <FaShoppingCart color="white" size="24px" />,
    pending: <FaClock color="white" size="24px" />,
    payment: <FaCheck color="white" size="24px" />,
    shipped: <FaTruck color="white" size="24px" />,
  };

  return (
    <Box rounded="lg" border="1px" borderColor="gray.700" p={6}>
      <Text fontSize="lg" fontWeight="semibold" mb={4}>Reference Number: <Text as="span" color={statusColor[status]}>{reference_number}</Text></Text>
      
      <HStack justify="center" align="center" mb={6}>
        <VStack>
          <Box bg={statusColor.checkout} rounded="full" p={3}>
            {statusIcon.checkout}
          </Box>
          <Text fontSize="lg" fontWeight="semibold">Checkout</Text>
        </VStack>
        <StatusLine isActive />
        <VStack>
          <Box bg={statusColor.pending} rounded="full" p={3}>
            {statusIcon.pending}
          </Box>
          <Text fontSize="lg" fontWeight="semibold">Pending</Text>
        </VStack>
        <StatusLine isActive={payment_status === "verified"} />
        <VStack opacity={payment_status === "verified" ? 1 : 0.4}>
          <Box bg={statusColor.payment} rounded="full" p={3}>
            {statusIcon.payment}
          </Box>
          <Text fontSize="lg" fontWeight="semibold">Payment</Text>
        </VStack>
        <StatusLine isActive={status === "SHIPPED"} />
        <VStack opacity={status === "SHIPPED" ? 1 : 0.4}>
          <Box bg={statusColor.shipped} rounded="full" p={3}>
            {statusIcon.shipped}
          </Box>
          <Text fontSize="lg" fontWeight="semibold">Shipped</Text>
        </VStack>
      </HStack>

        {/* Order Items */}
        {items.map((item, index) => (
          <Box key={index} p={4} bg="gray.50" rounded="md" my={2} shadow="xs">
            <HStack spacing={5}>
              <Image boxSize="100px" objectFit="cover" rounded="md" src={item.product.image} alt={item.product.name} />
              <VStack align="start" spacing={1} flex="1">
                <Text fontSize="md" fontWeight="semibold">{item.product.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  Category: {item.product.category.name} • Brand: {item.product.brand.name} • Size: {item.size}
                </Text>
                <Text fontWeight="semibold" color="green.500">P{item.price}</Text>
              </VStack>
            </HStack>
          </Box>
        ))}

        <Divider borderColor="gray.300" my={4} />
        
        {/* Summary and Tracking Information */}
        <VStack spacing={2} align="stretch">
          <HStack justifyContent="space-between">
            <Text color="gray.600">Quantity:</Text>
            <Text fontWeight="semibold">{totalQuantity}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontSize="lg" fontWeight="semibold">Total:</Text>
            <Text fontSize="lg" color="green.500" fontWeight="semibold">
              P{orderItems.grand_total.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </HStack>

      {status === "SHIPPED" && (
        <VStack align='start' spacing={2}>
          <HStack>
            <Text fontWeight='semibold'>Tracking #: </Text>
            <Text color='gray.600'>{tracking_number || 'Not Available'}</Text>
          </HStack>
          <HStack>
            <Text fontWeight='semibold'>Tracking URL: </Text>
            {tracking_url ? (
              <Link href={tracking_url.startsWith('http') ? tracking_url : `http://${tracking_url}`} isExternal textDecoration="underline" color='blue.500'>
                View Tracking
              </Link>
            ) : (
              <Text color='gray.600'>Not Available</Text>
            )}
          </HStack>
          <HStack>
            <Text fontWeight='semibold'>Estimated Delivery Date: </Text>
            <Text color='gray.600'>{estimated_delivery_date || 'Not Available'}</Text>
          </HStack>
          <Button colorScheme='blue' onClick={() => onReceived(reference_number)}>
            Mark as Received
          </Button>
        </VStack>
      )}
            </VStack>

    </Box>
  );
};

export default OrderDetailItem;
