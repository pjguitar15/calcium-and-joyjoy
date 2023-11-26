import { Box, Button, Heading, Text } from "@chakra-ui/react";
import AddressModal from "./AddressModal";
import axiosInstance from "../Shared/utils/axiosInstance";
import { useState } from "react";
function Addresses() {
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const address = user?.user_info.address;

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
        {!address ? (
          <Text mt='8px'>You currently don't have any delivery addresses.</Text>
        ) : (
          <Box>
            <Text mt='24px'>{address}</Text>
            <Button onClick={handleRemove} variant='unstyled' color='red.500'>
              Remove
            </Button>
          </Box>
        )}
      </Box>
      {!address && (
        <Box mt='24px' display='flex' justifyContent='end'>
          <AddressModal onReload={() => setRefresh((prev) => !prev)} />
        </Box>
      )}
    </>
  );
}

export default Addresses;
