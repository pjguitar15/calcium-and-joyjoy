import {
  Box,
  Button,
  Circle,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
function CustomizePage() {
  const [lace, setLace] = useState("Black");
  const laceColors = ["Black", "Red", "Blue"];

  return (
    <Box>
      <HStack justifyContent='end' mb='24px' w='100%' gap='32px'>
        <Button
          borderRadius='20px'
          bgColor='var(--primary)'
          _hover={{
            bgColor: "red.500",
          }}
          color='white'
          px='32px'
        >
          Cancel
        </Button>
        <Button
          color='white'
          borderRadius='20px'
          bgColor='var(--primary)'
          _hover={{
            bgColor: "var(--accent)",
          }}
          px='32px'
        >
          Done
        </Button>
      </HStack>
      <Grid justifyItems='center' gridTemplateColumns='1fr 1fr'>
        <Image />
        <VStack align='normal'>
          <Text mb='32px' fontSize='24px' fontWeight='semibold' opacity={0.7}>
            Customize Your Shoes
          </Text>
          <Box>
            <Text mb='16px' fontSize='24px'>
              Lace Color:
            </Text>
            <HStack gap='32px' mt='16px'>
              {laceColors.map((color) => (
                <Box
                  key={color}
                  opacity={lace === color ? 0.7 : 0.45}
                  cursor='pointer'
                >
                  <Circle
                    mx='auto'
                    w='20px'
                    aspectRatio='1/1'
                    bgColor={color}
                    mb='8px'
                  />
                  <Text>{color}</Text>
                </Box>
              ))}
            </HStack>

            <Box mt='48px'>
              <Text>Socks recommended:</Text>
            </Box>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
}

export default CustomizePage;
