import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Circle,
  Grid,
  Image,
  Box,
  Text,
  HStack,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import convertCurrency from "../Shared/utils/convertCurrency";
import config from "../Shared/utils/config";
import { subtractOne } from "../Store/Cart";

const CartPopOver = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const handleRemove = (item) => {
    dispatch(subtractOne(item));
    // console.log(id);
  };

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Button pos='relative' variant='unstyled'>
          Cart
          <Circle
            pos='absolute'
            top='4px'
            right='-16px'
            bgColor='var(--accent)'
            size='20px'
            fontSize='12px'
          >
            {/* {cart.length} */}
            {totalQuantity}
          </Circle>
        </Button>
      </PopoverTrigger>
      <PopoverContent w='400px' bgColor='#F2F0E6'>
        <PopoverArrow bgColor='#F2F0E6' />
        <PopoverCloseButton size='md' />
        <PopoverBody
          mt='40px'
          px='32px'
          pt='16px'
          pb={cart.length < 1 ? "40px" : "16px"}
          overflowY='auto'
          maxH='70vh'
        >
          {cart.length < 1 ? (
            <Text textAlign='center'>There are no items in your cart.</Text>
          ) : (
            cart.map((item) => {
              const { name, price, gender, quantity, image, size } = item;

              return (
                <Grid
                  maxH='320px'
                  gridTemplateColumns='1fr 1fr'
                  overflowY='auto'
                  justifyContent='center'
                  justifyItems='start'
                  columnGap='16px'
                  key={item.name + Math.random()}
                  mb='32px'
                >
                  <Center justifySelf='center' h='100px'>
                    <Image
                      borderRadius='10px'
                      src={`${config.apiUrl}/storage/${image}`}
                      maxH='100px'
                    />
                  </Center>

                  <Box w='100%' color='gray.500' fontSize='14px'>
                    <Text color='black' fontSize='16px' fontWeight='semibold'>
                      {name}
                    </Text>
                    <Text>{gender === "male" ? "Men's" : "Women's"} shoes</Text>
                    <HStack justifyContent='space-between'>
                      <Text fontSize='12px' fontWeight='bold'>
                        Size: {size}
                      </Text>
                      <Text fontSize='12px'>Quantity: {quantity}</Text>
                    </HStack>
                    <HStack mt='-4px' justifyContent='space-between'>
                      <Text>{convertCurrency(price)}</Text>
                      <Button
                        fontSize='14px'
                        variant='unstyled'
                        color='red.500'
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </Button>
                    </HStack>
                  </Box>
                </Grid>
              );
            })
          )}
          {/* GO TO CART/CHECKOUT */}
          {cart.length > 0 && (
            <HStack mt='40px' justifyContent='center' align='normal'>
              <Link to='/cart'>
                <Button
                  variant='outline'
                  fontSize='15px'
                  px='32px'
                  borderRadius='20px'
                  w='100%'
                  border='solid 1px var(--primary)'
                >
                  View Cart
                </Button>
              </Link>
              <Link to='/checkout'>
                <Button
                  bgColor='var(--primary)'
                  _hover={{
                    bgColor: "var(--accent)",
                  }}
                  color='white'
                  fontSize='15px'
                  px='32px'
                  borderRadius='20px'
                  w='100%'
                >
                  Checkout
                </Button>
              </Link>
            </HStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopOver;
