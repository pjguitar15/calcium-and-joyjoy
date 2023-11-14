import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import YouMightAlsoLike from "../Shared/UI/YouMightAlsoLike";
import { Link } from "react-router-dom";
function CartPage() {
  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];
  return (
    <Box maxW='1100px' mx='auto'>
      <Grid gridTemplateColumns='6.5fr 4.5fr' gap='80px'>
        <Box pb='32px' borderBottom='solid 1px #d1d1d1'>
          <Text fontSize='24px' mb='24px' fontWeight='semibold'>
            Cart
          </Text>
          <Grid gap='24px' gridTemplateColumns='1fr 1fr 1fr'>
            <Image
              borderRadius='20px'
              bgColor='gray.100'
              w='240px'
              src='/airJordan.png'
              py='16px'
              h='100%'
            />

            <Box color='gray.500' fontSize='14px'>
              <Text
                color='black'
                mb='8px'
                fontWeight='semibold'
                fontSize='18px'
              >
                Air Force 1 White
              </Text>
              <Text>Men/Women's Shoes</Text>
              <Text>Cloud White/ White</Text>
              <HStack mt='16px'>
                <Select>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Select>
                <Input type='number' />
              </HStack>

              <Button variant='unstyled' color='red.500'>
                Remove
              </Button>
            </Box>
            <Text fontWeight='semibold' ml='auto' mr='8px'>
              &#8369;5,495.00
            </Text>
          </Grid>
        </Box>
        <Box>
          <Text mb='24px' fontWeight='semibold' fontSize='24px'>
            Summary
          </Text>
          <HStack justifyContent='space-between'>
            <Text>Subtotal</Text>
            <Text>1 million</Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text>Shipping</Text>
            <Text>8 million</Text>
          </HStack>
          <HStack
            my='40px'
            py='16px'
            borderBlock='solid 1px #d1d1d1'
            justifyContent='space-between'
          >
            <Text>Total</Text>
            <Text>9 million</Text>
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
