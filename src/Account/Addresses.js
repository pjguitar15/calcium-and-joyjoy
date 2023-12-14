import { Box, Button, Heading, Text, Badge, Alert, AlertIcon, Flex, Stack, Divider } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai"; // Using only for the delete button
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

  const { data: addresses, isLoading } = useQuery(['addresses', refresh], async () => {
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
  }, {
    refetchOnWindowFocus: true 
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

<Box maxW='lg' mx='auto' px='4'>
        <Heading fontWeight='semibold' mb='6' fontSize='2xl' textAlign='center'>
          Delivery Addresses 
          <Badge ml='2' colorScheme='green' fontSize='lg'>
            {safeAddresses.length}/{maxAddresses}
          </Badge>
        </Heading>

        {safeAddresses.length === 0 ? (
          <Text fontSize='lg' textAlign='center'>You currently don't have any delivery addresses.</Text>
        ) : (
          safeAddresses.map((address, index) => (
            <Box
              key={index}
              mb='6'
              p='6'
              border='1px solid gray'
              rounded='xl'
              bg='white'
              shadow='base'
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <Stack spacing={4}>
                <Text fontSize='xl' fontWeight='bold'>{address.label}</Text>
                <Divider borderColor='gray.300'/>
                <Text fontSize='lg'>{address.street_address}, {address.building_address}</Text>
                <Text fontSize='lg'>{address.city_municipality}, {address.barangay}, {address.postal_code}</Text>
              </Stack>
              <Flex mt='4' justifyContent='flex-end'>
                <Button
                  onClick={() => handleRemove(address.id)}
                  variant='solid'
                  colorScheme='red'
                  leftIcon={<AiOutlineDelete />}
                  size='md'
                >
                  Remove
                </Button>
              </Flex>
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
