import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import convertCurrency from "../Shared/utils/convertCurrency";
import { subtractOne } from "../Store/cart";
import { useEffect } from 'react';

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleRemove = (item) => {
    dispatch(subtractOne(item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 300; // Assuming a flat shipping cost
  const total = subtotal + shippingCost;

  return (
    <Box maxW='1100px' mx='auto'>
      <Grid gridTemplateColumns='6.5fr 4.5fr' gap='80px'>
        <Box pb='32px' borderBottom='solid 1px #d1d1d1'>
          <Text fontSize='24px' mb='24px' fontWeight='semibold'>
            Cart
          </Text>
          <VStack overflow='auto' maxH='60vh' align='normal'>
            {cart.map((item, index) => (
              <Grid
                key={`${item.id}-${index}`}
                gap='24px'
                gridTemplateColumns='1fr 1fr 1fr'
                alignItems='start'
              >
                <Box maxW='160px'>
                  <Image
                    borderRadius='20px'
                    w='100%'
                    src={item.image}
                  />
                </Box>

                <Box color='gray.500' fontSize='14px'>
                  <Text
                    color='black'
                    mb='8px'
                    fontWeight='semibold'
                    fontSize='18px'
                  >
                    {item.name}
                  </Text>
                  <Text>{item.gender === "male" ? "Men's" : item.gender === "female" ? "Women's" : "Unisex"} Shoes</Text>
                  <Text>Cloud White/ White</Text>
                  <HStack gap='12px'>
                    <Text fontWeight='bold'>Size: {item.size}</Text>
                    <Text fontWeight='bold'>Quantity: {item.quantity}</Text>
                  </HStack>
                  <Button
                    variant='unstyled'
                    color='red.500'
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </Button>
                </Box>
                <Text
                  alignSelf='start'
                  fontWeight='semibold'
                  ml='auto'
                  mr='8px'
                >
                  {convertCurrency(item.price * item.quantity)}
                </Text>
              </Grid>
            ))}
          </VStack>
        </Box>
        <Box>
          <Text mb='24px' fontWeight='semibold' fontSize='24px'>
            Summary
          </Text>
          <HStack justifyContent='space-between'>
            <Text>Subtotal</Text>
            <Text>{convertCurrency(subtotal)}</Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text>Shipping</Text>
            <Text>{convertCurrency(shippingCost)}</Text>
          </HStack>
          <HStack
            my='40px'
            py='16px'
            borderBlock='solid 1px #d1d1d1'
            justifyContent='space-between'
          >
            <Text>Total</Text>
            <Text>{convertCurrency(total)}</Text>
          </HStack>
          <Link to='/checkout'>
            <Button borderRadius='40px' w='100%'>
              Checkout
            </Button>
          </Link>
        </Box>
      </Grid>
    </Box>
  );
}

export default CartPage;
