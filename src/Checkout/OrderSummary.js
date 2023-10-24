import {
  HStack,
  Text,
  Box,
  Heading,
  Grid,
  Image,
  VStack,
  Divider,
} from "@chakra-ui/react";
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

      <Grid gap='16px' alignItems='center' gridTemplateColumns='1fr 1fr'>
        <Image w='200px' h='200px' src='dummyShoe.png' loading='lazy' />
        <VStack
          fontWeight='semibold'
          fontSize='14px'
          gap='0px'
          alignItems='normal'
        >
          <Text fontWeight='bold'>Air Force 1 White</Text>
          <Text color='gray.500'>Men/Women's Shoes</Text>
          <Text>Size: 9</Text>
          <Text>Quantity: 1</Text>
          <Text>&#8369;1</Text>
        </VStack>
      </Grid>
      <Divider mt='-32px' />
    </Box>
  );
}

export default OrderSummary;
