import { Box, Button, Heading, Text } from "@chakra-ui/react";
import AddressModal from "./AddressModal";
function Addresses() {
  return (
    <>
      <Box>
        <Heading fontWeight='semibold'>Delivery Addresses</Heading>
        <Text mt='8px'>You currently don't have any delivery addresses.</Text>
      </Box>
      <Box mt='24px' display='flex' justifyContent='end'>
        <AddressModal />
      </Box>
    </>
  );
}

export default Addresses;
