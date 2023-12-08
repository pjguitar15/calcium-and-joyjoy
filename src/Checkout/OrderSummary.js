import {
  HStack,
  Text,
  Box,
  Heading,
  Grid,
  Image,
  VStack,
  Input,
} from "@chakra-ui/react";
import useSubtotal from "../Shared/Hooks/useSubtotal";
import convertCurrency from "../Shared/utils/convertCurrency";
import { useSelector } from "react-redux";
import config from "../Shared/utils/config";
function OrderSummary() {
  const subtotal = useSubtotal();

  const cart = useSelector((state) => state.cart);
  return (
    <Box>
      <Heading fontWeight='normal' mb='24px'>
        Order Summary
      </Heading>
      <Box color='gray.500' borderBottom='solid 1px #d1d1d1' pb='16px'>
        <HStack justifyContent='space-between'>
          <Text>Subtotal</Text>
          <Text> {convertCurrency(subtotal)} </Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Shipping</Text>
          <Text>{convertCurrency(300)}</Text>
        </HStack>
        <HStack mt='16px' justifyContent='space-between'>
          <Text>Voucher</Text>
          <Input textAlign='right' maxW='160px' placeholder='Enter code' />
        </HStack>
      </Box>
      <HStack
        justifyContent='space-between'
        borderBottom='solid 1px #d1d1d1'
        pt='8px'
        pb='16px'
      >
        <Text>Total</Text>
        <Text>{convertCurrency(subtotal + 300)}</Text>
      </HStack>
      <VStack gap='8px' mt='24px' maxH='45vh' overflowY='auto'>
        {cart.map((item, i) => (
          <Grid
            key={i}
            gap='16px'
            alignItems='start'
            gridTemplateColumns='1fr 1fr'
          >
            <Box overflow='hidden' borderRadius='10px' maxH='160px'>
              <Image
                src={`${config.apiUrl}/storage/${item.image}`}
                alt={item.name}
                loading='lazy'
              />
            </Box>
            <VStack
              fontWeight='semibold'
              fontSize='14px'
              gap='0px'
              alignItems='normal'
            >
              <Text fontWeight='bold'>{item.name}</Text>
              <Text color='gray.500'>Men/Women's Shoes</Text>
              <Text>Size: {item.size}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>{convertCurrency(item.price)}</Text>
            </VStack>
          </Grid>
        ))}
      </VStack>
    </Box>
  );
}

export default OrderSummary;
