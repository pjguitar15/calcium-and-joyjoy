import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Circle,
  Flex,
  Image,
  Box,
  Text,
  IconButton,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import convertCurrency from "../Shared/utils/convertCurrency";
import { subtractOne } from "../Store/cart";

const CartPopOver = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleRemove = (item) => {
    dispatch(subtractOne(item));
  };

  return (
    <Popover placement='bottom-start'>
      <PopoverTrigger>
        <Button pos='relative' variant='ghost'>
          Cart
          <Circle pos='absolute' top='-1px' right='-1px' bgColor='var(--accent)' size='20px' fontSize='12px'>
            {totalQuantity}
          </Circle>
        </Button>
      </PopoverTrigger>
      <PopoverContent w='350px' bgColor='#F2F0E6' boxShadow='sm'>
        <PopoverArrow bgColor='#F2F0E6' />
        <PopoverCloseButton />
        <PopoverBody p={3}>
          {cart.length < 1 ? (
            <Text textAlign='center' py={5}>Your cart is empty.</Text>
          ) : (
            cart.map((item, index) => {
              const { name, price, gender, quantity, image, size, category } = item;
              const isShoesCategory = category && category.name.toLowerCase() === 'shoes';
              const totalPrice = price * quantity; // Calculate total price here
              return (
                <Box key={`${name}-${index}`} my={2}>
                  <Flex align='center' gap={3}>
                    <Image borderRadius='md' boxSize='50px' objectFit='cover' src={image} alt={name} />
                    <Box flex='1'>
                      <Text fontWeight='semibold'>{name}</Text>
                      <Text fontSize='xs' color='gray.600'>
                        {`${category.name} - ${gender === "male" ? "Men's" : "Women's"}${isShoesCategory ? ` - Size: ${size}` : ''}`}
                      </Text>
                      <Text fontSize='sm' fontWeight='bold'>{convertCurrency(price)}</Text>
                    </Box>
                    <IconButton
                      icon={<DeleteIcon />}
                      size='sm'
                      variant='ghost'
                      aria-label={`Remove ${name}`}
                      onClick={() => handleRemove(item)}
                    />
                  </Flex>
                  <Divider my={2} borderColor='black' />
                  <Flex justify='space-between'>
                    <Text fontSize='sm'>Quantity: {quantity}</Text>
                    <Text fontSize='sm'>Total: {convertCurrency(totalPrice)}</Text> {/* Use total price here */}
                  </Flex>
                  {index < cart.length - 1 && <Divider my={2} borderColor='black' />}
                </Box>
              );
            })
          )}
          {cart.length > 0 && (
            <HStack mt='4' spacing={3} justifyContent='center'>
              <Link to='/cart'>
                <Button
                  variant='outline'
                  fontSize='15px'
                  px='32px'
                  borderRadius='20px'
                  border='solid 1px var(--primary)'
                >
                  View Cart
                </Button>
              </Link>
              <Link to='/checkout'>
                <Button
                  bgColor='var(--primary)'
                  _hover={{ bgColor: "var(--accent)" }}
                  color='white'
                  fontSize='15px'
                  px='32px'
                  borderRadius='20px'
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
