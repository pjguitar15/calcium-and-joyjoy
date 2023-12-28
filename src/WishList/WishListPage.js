import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import WishList from "./WishList";

function WishListPage() {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));
  const [wishlist, setWishlist] = useState([]);

  const { isLoading, isError, error, data } = useQuery("wishlist", async () => {
    if (!user) return;
    const res = await axiosInstance.get("/user/wishlist", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return res.data;
  }, { enabled: !!user });

  useEffect(() => {
    if (data?.data) {
      setWishlist(data.data);
    }
  }, [data]);

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    console.error(error); // Log the error
    return (
      <Box textAlign='center'>
        <Text>An error occurred while fetching the wishlist.</Text>
        <Button onClick={() => queryClient.refetchQueries('wishlist')}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box textAlign='center'>
      <Heading mb='16px' fontWeight='semibold'>
        Wishlist
      </Heading>
      {user ? (
        <WishList list={wishlist} setList={setWishlist} />
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
