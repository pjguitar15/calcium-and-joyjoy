import { Box, Button, Grid, HStack, Heading, Text, InputGroup, InputLeftAddon, Input, InputRightAddon } from '@chakra-ui/react';
import convertCurrency from '../../Shared/utils/convertCurrency';

const ProductDetails = ({ shoe, onAddToCart, onWishList, onCheckout, selectedSize, setSelectedSize, qty, setQty, sizes }) => {
  const handleQtyChange = (e) => {
    if (e.target.value < 0 || !e.target.value) return setQty(1);
    if (e.target.value > 10) return setQty(10);
    setQty(e.target.value);
  };

  return (
    <Box>
      <Heading fontWeight='semibold' mb='16px'>{shoe.name}</Heading>
      <Text>{shoe.gender === "male" ? "Men's" : "Women's"} shoes</Text>
      <Text fontWeight='semibold'>{convertCurrency(shoe.price)}</Text>
      <Text>Colors: {shoe.colors.map(colorObj => colorObj.color.name).join(', ')}</Text>
      <HStack gap='24px' mb='8px'>
        <Text fontWeight='semibold'>Quantity:</Text>
        <InputGroup maxW='140px'>
          <InputLeftAddon children='-' cursor='pointer' onClick={() => setQty(qty > 1 ? qty - 1 : 1)} />
          <Input value={qty} type='number' onChange={handleQtyChange} textAlign='center' />
          <InputRightAddon children='+' cursor='pointer' onClick={() => setQty(qty < 10 ? qty + 1 : 10)} />
        </InputGroup>
      </HStack>
      <Grid mt='8px' gap='8px' gridTemplateColumns='repeat(4, 1fr)'>
        {sizes.map(size => (
          <Button key={size} variant={selectedSize === size ? 'solid' : 'outline'} onClick={() => setSelectedSize(size)}>
            US {size}
          </Button>
        ))}
      </Grid>
      <Button onClick={onAddToCart} mt='32px'>Add to Cart</Button>
      <Button onClick={onWishList} mt='32px'>Wishlist</Button>
<Button onClick={onCheckout} mt='16px' colorScheme='blue'>Checkout</Button>

    </Box>
  );
};

export default ProductDetails;
