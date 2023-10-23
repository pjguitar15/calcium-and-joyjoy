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
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const CartPopOver = () => {
  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Button pos='relative' variant='unstyled'>
          Cart
          <Circle
            pos='absolute'
            top='4px'
            right='-16px'
            bgColor='red'
            size='20px'
            fontSize='12px'
          >
            0
          </Circle>
        </Button>
      </PopoverTrigger>
      <PopoverContent w='400px' bgColor='#F2F0E6'>
        <PopoverArrow bgColor='#F2F0E6' />
        <PopoverCloseButton size='md' />
        <PopoverBody mt='40px' px='32px' py='16px'>
          <Grid
            maxH='320px'
            gridTemplateColumns='1fr 1fr'
            overflowY='auto'
            justifyContent='center'
            justifyItems='center'
            columnGap='16px'
          >
            <Image src='/airJordan.png' />
            <Box color='gray.500' fontSize='14px'>
              <Text color='black' fontSize='16px' fontWeight='semibold'>
                Air Force 1 White
              </Text>
              <Text>Men/Women's Shoes</Text>
              <HStack justifyContent='space-between'>
                <Text fontSize='12px'>Size: 8</Text>
                <Text fontSize='12px'>Quantity: 1</Text>
              </HStack>
              <HStack mt='-4px' justifyContent='space-between'>
                <Text>&#8369;5495</Text>
                <Button fontSize='14px' variant='unstyled' color='red.500'>
                  Remove
                </Button>
              </HStack>
            </Box>
          </Grid>

          {/* GO TO CART/CHECKOUT */}
          <HStack mt='40px' justifyContent='center' align='normal'>
            <Link to='/cart'>
              <Button
                variant='outline'
                fontSize='15px'
                px='32px'
                borderRadius='20px'
                w='100%'
                border='solid 1px red'
              >
                View Cart
              </Button>
            </Link>
            <Link to='/cart'>
              <Button
                bgColor='red'
                fontSize='15px'
                px='32px'
                borderRadius='20px'
                w='100%'
              >
                Checkout
              </Button>
            </Link>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CartPopOver;
