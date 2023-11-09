import {
  Box,
  Button,
  Circle,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
function CustomizePage() {
  return (
    <Box>
      <HStack justifyContent='end' mb='24px' w='100%' gap='16px'>
        <Button>Cancel</Button>
        <Button>Done</Button>
      </HStack>
      <Grid justifyItems='center' gridTemplateColumns='1fr 1fr'>
        <Box>image dito</Box>
        <VStack>
          <Text>Customize Your Shoes</Text>
          <Box>
            <Text>Lace Color:</Text>
            <HStack gap='16px' mt='16px'>
              <Circle aspectRatio='1/1' minW='24px' bgColor='black' />
              <Circle aspectRatio='1/1' minW='24px' bgColor='red' />
              <Circle aspectRatio='1/1' minW='24px' bgColor='blue' />
            </HStack>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

export default CustomizePage;
