import { Box, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ShoeList from "./ShoeList";
import Accessories from "./Accessories";
function Homepage() {
  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <Grid
        borderRadius='24px'
        bgImage='linear-gradient(to bottom right, rgba(0,0,0,.9) ,rgba(0,0,0,.6))'
        h='80vh'
        pos='relative'
        gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gridTemplateRows={{ base: "1fr 1fr", lg: "1fr" }}
      >
        <Text
          fontWeight='bold'
          filter='drop-shadow(4px 4px 2px #FF0707)'
          fontSize='8vw'
          color='white'
          lineHeight='shorter'
          pl='40px'
          pt='56px'
          letterSpacing='tight'
        >
          SAMPLE
          <br />
          PROTOTYPE
        </Text>
        <Box display='flex' pos='relative' alignItems='center'>
          <Skeleton
            w='100%'
            h={{ base: "100%", lg: "400px" }}
            pos='absolute'
            // left={{ lg: "-3vw" }}
          />
        </Box>
      </Grid>
      <ShoeList />
      <Accessories />
    </VStack>
  );
}

export default Homepage;
