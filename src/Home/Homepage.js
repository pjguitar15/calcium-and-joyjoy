import { Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ShoeList from "./ShoeList";
function Homepage() {
  return (
    <VStack align='normal' justify='normal' gap='40px'>
      <Grid
        p='48px'
        borderRadius='24px'
        bgImage='linear-gradient(to bottom right, rgba(0,0,0,.9) ,rgba(0,0,0,.6))'
        gridTemplateColumns='1fr 1fr'
      >
        <Text
          color='white'
          filter='drop-shadow(2px 2px 2px red)'
          fontSize='120px'
          fontWeight='bold'
        >
          SAMPLE <br /> PROTOTYPE
        </Text>
        <Skeleton w='100%' />
      </Grid>
      <ShoeList />
    </VStack>
  );
}

export default Homepage;
