import { Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
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
      >
        <Text
          color='white'
          filter='drop-shadow(2px 2px 2px red)'
          fontSize={{ base: "80px", lg: "140px" }}
          fontWeight='bold'
          textAlign={{ base: "center", lg: "left" }}
          mt='80px'
          lineHeight='140px'
          ml='40px'
        >
          SAMPLE <br /> PROTOTYPE
        </Text>
        <Skeleton w='100%' h='600px' />
      </Grid>
      <ShoeList />
      <Accessories />
    </VStack>
  );
}

export default Homepage;
