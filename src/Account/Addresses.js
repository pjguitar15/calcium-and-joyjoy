import { Box, Button, Heading, Text } from "@chakra-ui/react";
import AddressModal from "./AddressModal";
import axiosInstance from "../Shared/utils/axiosInstance";
import { useState } from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
function Addresses() {
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const { data: address, isLoading } = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const res = await axiosInstance.get("/user/address", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      return res.data.data;
    },
  });
  // const address = user?.user_info.address;
  if (isLoading) return <LoadingSpinner />;
  const handleRemove = async () => {
    await axiosInstance.post(
      "/user/update",
      { address: null },
      {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      }
    );

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: user.token,
        user_info: { ...user.user_info, address: null },
      })
    );
    setTimeout(() => {
      setRefresh((prev) => !prev);
    }, 700);
  };

  return (
    <>
      <Box>
        <Heading fontWeight='semibold'>Delivery Addresses</Heading>
        {address.length < 1 ? (
          <Text mt='8px'>You currently don't have any delivery addresses.</Text>
        ) : (
          <Box>
            <Text mt='24px'>{address[0]}</Text>
            <Button onClick={handleRemove} variant='unstyled' color='red.500'>
              Remove
            </Button>
          </Box>
        )}
      </Box>
      {address.length < 1 && (
        <Box mt='24px' display='flex' justifyContent='end'>
          <AddressModal onReload={() => setRefresh((prev) => !prev)} />
        </Box>
      )}
    </>
  );
}

export default Addresses;
