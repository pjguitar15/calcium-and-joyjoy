import { Box, Button, Heading, Text, Badge, Alert, AlertIcon } from "@chakra-ui/react";
import AddressModal from "./AddressModal";
import axiosInstance from "../Shared/utils/axiosInstance";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";

function Addresses() {
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const maxAddresses = 3;

  const { data: addresses, isLoading } = useQuery(['addresses', ], async () => {
    try {
      const res = await axiosInstance.get("/user/address", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      return res.data.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError("Failed to load addresses. Please try again later.");
      return [];
    }
  });

  useEffect(() => {
    console.log("Addresses:", addresses);
  }, [addresses]);

  if (isLoading) return <LoadingSpinner />;

  const safeAddresses = addresses || [];

  const handleRemove = async (addressId) => {
    try {
      await axiosInstance.post(
        "/user/address/delete",
        { id: addressId },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error removing address:", error);
      setError("Failed to remove address. Please try again later.");
    }
  };

  const canAddMoreAddresses = safeAddresses.length < maxAddresses;

  return (
    <>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

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
          safeAddresses.map((address, index) => {
            console.log("Rendering address:", address);
            return (
              <Box key={index} mt='24px'>
                <Text><strong>{address.label}:</strong> {address.street_address}, {address.building_address}, {address.city_municipality}, {address.barangay}, {address.postal_code}</Text>
                <Button onClick={() => handleRemove(address.id)} variant='unstyled' color='red.500'>
                  Remove
                </Button>
              </Box>
            );
          })
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
