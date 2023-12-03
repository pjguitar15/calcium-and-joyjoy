import { Box, HStack, Image, Text } from "@chakra-ui/react";
function CustomizeRes({ results }) {
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
        {results?.shoe && (
          <Box>
            <Text>{results.shoe.name}</Text>
            <Image
              src={
                "https://m.media-amazon.com/images/I/71zKZNtIxGL._AC_UY580_.jpg"
              }
              maxW='200px'
            />
          </Box>
        )}
      </HStack>
    </Box>
  );
}

export default CustomizeRes;
