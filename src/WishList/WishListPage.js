import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import WishList from "./WishList";

function WishListPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Only make the API call if the user is authenticated
  const { data, isLoading, isError, error } = useQuery("wishlist", async () => {
    if (!user) return;
    const res = await axiosInstance.get("/user/wishlist", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res.data;
  }, {
    enabled: !!user  // This disables the query from automatically running if user is not authenticated
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    console.error(error); // Log the error
    return <Text>An error occurred while fetching the wishlist.</Text>;
  }

  const list = data?.data; // Safely access the data

  return (
    <Box textAlign='center'>
      <Heading mb='16px' fontWeight='semibold'>
        Wishlist
      </Heading>
      {user ? (
        <WishList list={list} />
      ) : (
        <Box>
          <Text mb='16px'>You need an account to have a wishlist.</Text>
          <Link to='/auth/sign-in'>
            <Button variant='link'>Sign in</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default WishListPage;
