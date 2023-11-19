import { Box, Button, Heading, Text } from "@chakra-ui/react";
function Addresses() {
  return (
    <>
      <Box>
        <Heading fontWeight='semibold'>Delivery Addresses</Heading>
        <Text mt='8px'>You currently don't have any delivery addresses.</Text>
      </Box>
      <Box mt='24px' display='flex' justifyContent='end'>
        <Button
          color='white'
          bgColor='black'
          borderRadius='20px'
          px='40px'
          _hover={{
            bgColor: "var(--accent)",
          }}
        >
          Add address
        </Button>
      </Box>
    </>
  );
}

export default Addresses;
