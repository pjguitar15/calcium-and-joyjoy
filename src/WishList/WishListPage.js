import { Box, Heading, Text } from "@chakra-ui/react";
function WishListPage() {
  return (
    <Box>
      <Box textAlign='center'>
        <Heading mb='16px' fontWeight='semibold'>
          Wishlist
        </Heading>
        <Text>There are no items in your wishlist.</Text>
      </Box>
    </Box>
  );
}

export default WishListPage;
