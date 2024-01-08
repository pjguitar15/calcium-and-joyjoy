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
  Center,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion, isValidMotionProp } from "framer-motion";
import convertCurrency from "../Shared/utils/convertCurrency";
import config from "../Shared/utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addToCheckout, subtractOne } from "../Store/cart";
import { useEffect } from 'react';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

function AddedToast({ item, show, dismount }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (!item || cart.length < 1) return <div />;

  const { name, price, gender, image, quantity, size, category } = item;
  const isShoesCategory = category && category.name.toLowerCase() === 'shoes';

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
      bottom='24px'
      left='50%'
      initial={{
        opacity: 0,
        transform: "translate(-50%, 120px)",
      }}
      animate={{
        opacity: 1,
        transform: "translate(-50%, 0)",
      }}
      exit={{
        opacity: 0,
        transform: "translate(-50%, 120px)",
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <HStack mb='24px' justifyContent='space-between'>
        <Text fontSize='14px' fontWeight='semibold'>
          1 item added to cart
        </Text>
        <CloseIcon onClick={handleDismount} cursor='pointer' fontSize='12px' />
      </HStack>
      <Grid
        maxH='320px'
        gridTemplateColumns='1fr 1fr'
        overflowY='auto'
        justifyContent='center'
        justifyItems='center'
        columnGap='16px'
      >
        <Center h='100px'>
          <Image
            borderRadius='10px'
            src={image}
            maxH='100px'
          />
        </Center>
        <Box color='gray.500' fontSize='14px'>
          <Text color='black' fontSize='16px' fontWeight='semibold'>
            {name}
          </Text>
          <Text>{`${category.name} - ${gender === "male" ? "Men's" : "Women's"}${isShoesCategory ? ` - Size: ${size}` : ''}`}</Text>
          <HStack justifyContent='space-between'>
            {isShoesCategory && <Text fontSize='12px'>Size: {size}</Text>}
            <Text fontSize='12px'>Quantity: {quantity}</Text>
          </HStack>
          <HStack mt='-4px' justifyContent='space-between'>
            <Text>{convertCurrency(price * quantity)}</Text>
            <Button
              onClick={() => {
                dispatch(subtractOne(item));
                dismount();
              }}
              fontSize='14px'
              variant='unstyled'
              color='red.500'
            >
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
            border='solid 1px var(--primary)'
          >
            View Cart
          </Button>
        </Link>

        <Button
          onClick={() => {
            navigate("/checkout")
            dispatch(
              addToCheckout({
                ...item,
                quantity: 1,
                price: item.price,
                size: item.sizes[0]?.size.name,
              })
            );
          }}
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

      </HStack>
    </ChakraBox>
  );
}

export default AddedToast;
