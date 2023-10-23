import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  Image,
  Text,
  HStack,
  Button,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function AddedToast({ show, dismount }) {
  const handleHover = () => {
    show();
  };
  const handleDismount = () => {
    dismount();
  };
  return (
    <ChakraBox
      onHoverStart={handleHover}
      onHoverEnd={handleDismount}
      mt='40px'
      px='32px'
      py='16px'
      w='400px'
      bgColor='#F2F0E6'
      // bgColor='blackAlpha.100'
      borderRadius='10px'
      zIndex={101}
      pos='fixed'
      top='24px'
      right='80px'
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <HStack mb='24px' justifyContent='space-between'>
        <Text fontSize='14px' fontWeight='semibold'>
          1 item added to cart
        </Text>
        <CloseIcon fontSize='12px' />
      </HStack>
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
        <Link to='/checkout'>
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
    </ChakraBox>
  );
}

export default AddedToast;
