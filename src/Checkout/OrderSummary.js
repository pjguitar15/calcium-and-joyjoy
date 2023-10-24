import { HStack, Text, Box, Heading } from "@chakra-ui/react";
function OrderSummary() {
  return (
    <Box>
      <Heading fontWeight='normal' mb='24px'>
        Order Summary
      </Heading>
      <Box color='gray.500' borderBottom='solid 1px #d1d1d1' pb='16px'>
        <HStack justifyContent='space-between'>
          <Text>Subtotal</Text>
          <Text>&#8369;1</Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Shipping</Text>
          <Text>&#8369;1</Text>
        </HStack>
      </Box>
      <HStack
        justifyContent='space-between'
        borderBottom='solid 1px #d1d1d1'
        pt='8px'
        pb='16px'
      >
        <Text>Total</Text>
        <Text>&#8369;1</Text>
      </HStack>
    </Box>
  );
}

export default OrderSummary;
