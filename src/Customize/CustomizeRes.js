import { Box, HStack, Image, Text } from "@chakra-ui/react";
function CustomizeRes({ results }) {
  console.log(results);
  return (
    <Box
      maxW='1200px'
      bgColor='gray.100'
      mx='auto'
      my='24px'
      minH='400px'
      borderRadius='10px'
      display='flex'
    >
      <HStack w='100%' justifyItems='center' justifyContent='center' gap='24px'>
        <Text>{results.shoe?.name}</Text>
        <Text>{results.sock?.name}</Text>
        <Text>{results.accessory?.name}</Text>
      </HStack>
    </Box>
  );
}

export default CustomizeRes;
