import {
  Box,
  Center,
  Grid,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import ShoeList from "./ShoeList";
import Accessories from "./Accessories";
function Homepage() {
  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <Grid
        p='48px'
        borderRadius='24px'
        bgImage='linear-gradient(to bottom right, rgba(0,0,0,.9) ,rgba(0,0,0,.6))'
        gridTemplateColumns={{ lg: "6fr 4fr", base: "1fr" }}
        h='70vh'
      >
        <Text
          color='white'
          filter='drop-shadow(2px 2px 2px red)'
          fontSize={{ base: "80px", lg: "140px" }}
          fontWeight='bold'
          textAlign={{ base: "center", lg: "left" }}
          lineHeight='140px'
          pt='80px'
          pl='40px'
        >
          SAMPLE <br /> PROTOTYPE
        </Text>

        <Box pos='relative'>
          <Image
            right='-120px'
            top='80px'
            pos='absolute'
            src='/heroSocks.png'
            filter='brightness(.7)'
          />
          <Image
            pos='absolute'
            src='/airJordan.png'
            transform='rotate(-24deg)'
            left='-200px'
            bottom='0'
          />
        </Box>
      </Grid>
      <ShoeList />
      <Accessories />
    </VStack>
  );
}

export default Homepage;
