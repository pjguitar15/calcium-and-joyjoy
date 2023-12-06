import { Box, Center, VStack, Text } from "@chakra-ui/react";
function WishList({ list }) {
  if (!list || list.length === 0)
    return (
      <Center>
        <Text>There are no items in your wishlist.</Text>
      </Center>
    );

  return (
    <VStack align='normal' gap='24px'>
      {list.map((item) => (
        <Box>{item.product.name}</Box>
      ))}
    </VStack>
  );
}

export default WishList;
