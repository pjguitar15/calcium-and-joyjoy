import React, { useState, useEffect } from "react";
import axiosInstance from "../Shared/utils/axiosInstance";
import { Box, Button, Heading, Text, Badge, Alert, AlertIcon, Flex, Stack, Divider, useToast, SimpleGrid } from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEnvironment } from "react-icons/ai";
import AddressModal from "./AddressModal";
import { useQuery } from "react-query";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";

function Addresses() {
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const maxAddresses = 3;
  const toast = useToast();

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

  const handleRemove = async (addressId) => {
    setIsRemoving(true);
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
      toast({
        title: "Address removed.",
        description: "The address has been successfully removed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error removing address:", error);
      setError("Failed to remove address. Please try again later.");
    } finally {
      setIsRemoving(false);
    }
  };

  const safeAddresses = addresses || [];
  const canAddMoreAddresses = safeAddresses.length < maxAddresses;

  return (
    <>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Box maxW='2xl' mx='auto' px={4} py={4}>
        <Flex direction="column" gap={6}>
          <Heading fontWeight='semibold' fontSize='2xl' textAlign='center'>
            Delivery Addresses
            <Badge ml={2} colorScheme='green' fontSize='lg'>
              {safeAddresses.length}/{maxAddresses}
            </Badge>
          </Heading>

          {isLoading ? (
            <LoadingSpinner />
          ) : safeAddresses.length === 0 ? (
            <Text fontSize='lg' textAlign='center'>You currently don't have any delivery addresses.</Text>
          ) : (
            safeAddresses.map((address, index) => (
              <Box
                key={index}
                p={6}
                border='1px solid gray'
                rounded='xl'
                bg='white'
                shadow='md'
                className="transition-transform duration-200 hover:shadow-lg hover:border-gray-400"
              >
                <Stack spacing={4}>
                  <Flex alignItems='center'>
                  <Box as={AiOutlineEnvironment} boxSize={6} color='gray.500' mr={2} />
                    <Text fontSize='xl' fontWeight='bold'>{address.label}</Text>
                  </Flex>
                  <Divider borderColor='gray.300'/>
                  <Text fontSize='lg'>{address.street_address}, {address.building_address}</Text>
                  <Text fontSize='lg'>{address.city_municipality}, {address.barangay}, {address.postal_code}</Text>
                </Stack>
                <Flex mt={4} justifyContent='flex-end'>
                  <Button
                    onClick={() => handleRemove(address.id)}
                    variant='solid'
                    colorScheme='red'
                    leftIcon={<AiOutlineDelete />}
                    size='md'
                    isLoading={isRemoving}
                  >
                    Remove
                  </Button>
                </Flex>
              </Box>
            ))
          )}

          {canAddMoreAddresses && (
            <Box display='flex' justifyContent='center'>
              <AddressModal onReload={() => setRefresh((prev) => !prev)} />
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
}

export default Addresses;
