import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import WishList from "./WishList";
function WishListPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading } = useQuery("wishlist", async () => {
    const res = await axiosInstance.get("/user/wishlist", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res.data;
  });

  if (isLoading) return <LoadingSpinner />;

  const { data: list } = data;
  console.log(list);

  return (
    <Box>
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
    </Box>
  );
}

export default WishListPage;
