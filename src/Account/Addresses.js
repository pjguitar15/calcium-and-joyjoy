import { Box, Button, Heading, Text, Badge } from "@chakra-ui/react";
import AddressModal from "./AddressModal";
import axiosInstance from "../Shared/utils/axiosInstance";
import { useState } from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";

function Addresses() {
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const maxAddresses = 3;

  const { data: addresses, isLoading } = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const res = await axiosInstance.get("/user/address", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      return res.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Ensure addresses is defined and has a default value
  const safeAddresses = addresses || [];

  const handleRemove = async (addressId) => {
    await axiosInstance.post(
      "/user/address/delete",
      { id: addressId },
      {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      }
    );
    setRefresh((prev) => !prev);
  };

  const canAddMoreAddresses = safeAddresses.length < maxAddresses;

  return (
    <>
      <Box>
        <Heading fontWeight='semibold'>
          Delivery Addresses 
          <Badge ml='10px' colorScheme='green'>
            {safeAddresses.length}/{maxAddresses}
          </Badge>
        </Heading>
        {safeAddresses.length === 0 ? (
          <Text mt='8px'>You currently don't have any delivery addresses.</Text>
        ) : (
          safeAddresses.map((address, index) => (
            <Box key={index}>
              <Text mt='24px'>{address}</Text>
              <Button onClick={() => handleRemove(address.id)} variant='unstyled' color='red.500'>
                Remove
              </Button>
            </Box>
          ))
        )}
      </Box>
      {canAddMoreAddresses && (
        <Box mt='24px' display='flex' justifyContent='end'>
          <AddressModal onReload={() => setRefresh((prev) => !prev)} />
        </Box>
      )}
    </>
  );
}

export default Addresses;
