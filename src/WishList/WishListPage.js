import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function WishListPage() {
  const user = localStorage.getItem("user");

  return (
    <Box>
      <Box textAlign='center'>
        <Heading mb='16px' fontWeight='semibold'>
          Wishlist
        </Heading>
        {user ? (
          <Text>There are no items in your wishlist.</Text>
        ) : (
          <Box>
            <Text mb='16px'>You need an account to have a wishlist.</Text>
            <Link to='/auth/sign-in'>
              <Button variant='link'>Sign in</Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default WishListPage;
