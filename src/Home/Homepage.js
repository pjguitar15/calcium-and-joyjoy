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
        gridTemplateColumns={{ lg: "1fr 1fr", base: "1fr" }}
      >
        <Text
          color='white'
          filter='drop-shadow(2px 2px 2px red)'
          fontSize={{ base: "80px", lg: "120px" }}
          fontWeight='bold'
          textAlign={{ base: "center", lg: "left" }}
        >
          SAMPLE <br /> PROTOTYPE
        </Text>
        <Skeleton w='100%' h='400px' />
      </Grid>
      <ShoeList />
      <Accessories />
    </VStack>
  );
}

export default Homepage;
