import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
function ProductPage() {
  return (
    <Box>
      <Grid gridTemplateColumns='1fr 1fr'>
        <Image src='dummyShoe.png' />
        <Box>
          <Heading>Air Force 1 White</Heading>
          <Text>Men/Women's Shoes</Text>
          <Text>5,495</Text>
          <Text>Color:Cloud White/ White</Text>
          <Box>
            <Text>Sizes</Text>
            {/* SIZES ARRAY */}
          </Box>
          <Button>Cutomize</Button>
          <VStack>
            <Button>Add to Cart</Button>
            <Button>Checkout</Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}

export default ProductPage;
