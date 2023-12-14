import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import YouMightAlsoLike from "../Shared/UI/YouMightAlsoLike";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "../Shared/utils/config";
import convertCurrency from "../Shared/utils/convertCurrency";
import { useEffect } from 'react';
function CartPage() {
  // const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Box maxW='1100px' mx='auto'>
      <Grid gridTemplateColumns='6.5fr 4.5fr' gap='80px'>
        <Box pb='32px' borderBottom='solid 1px #d1d1d1'>
          <Text fontSize='24px' mb='24px' fontWeight='semibold'>
            Cart
          </Text>
          <VStack overflow='auto' maxH='60vh' align='normal'>
            {cart.map((item) => (
              <Grid
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
                  <Text>{item.gender === "male" && "Men"}{item.gender === "female" && "Women"}{item.gender === "unisex" && "Unisex"}'s Shoes</Text>
                  <Text>Cloud White/ White</Text>
                  <HStack gap='12px'>
                    <Text fontWeight='bold'>Size: {item.size}</Text>
                    <Text fontWeight='bold'>Quantity: {item.quantity}</Text>
                  </HStack>
                  {/* <HStack mt='16px'>
                <Select>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Select>
                <Input type='number' />
              </HStack> */}

                  <Button variant='unstyled' color='red.500'>
                    Remove
                  </Button>
                </Box>
                <Text
                  alignSelf='start'
                  fontWeight='semibold'
                  ml='auto'
                  mr='8px'
                >
                  {convertCurrency(item.price)}
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
            <Text>
              {convertCurrency(cart.reduce((acc, cur) => acc + cur.price, 0))}
            </Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text>Shipping</Text>
            <Text> {convertCurrency(300)} </Text>
          </HStack>
          <HStack
            my='40px'
            py='16px'
            borderBlock='solid 1px #d1d1d1'
            justifyContent='space-between'
          >
            <Text>Total</Text>
            <Text>
              {convertCurrency(
                cart.reduce((acc, cur) => acc + cur.price, 0) + 300
              )}
            </Text>
          </HStack>
          <Link to='/checkout'>
            <Button borderRadius='40px' w='100%'>
              Checkout
            </Button>
          </Link>
        </Box>
      </Grid>
      {/* <YouMightAlsoLike /> */}
    </Box>
  );
}

export default CartPage;
