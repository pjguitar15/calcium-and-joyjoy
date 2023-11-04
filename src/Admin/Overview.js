import { Box, Grid, HStack, Heading, Icon, Text } from "@chakra-ui/react";
import ViewLayout from "./ViewLayout";
import { AiOutlineStock } from "react-icons/ai";
function Overview() {
  const dummy = Array.from({ length: 3 });

  return (
    <ViewLayout>
      <Heading fontSize='32px' fontWeight='semibold'>
        Dashboard
      </Heading>

      <Grid
        mt='72px'
        gridTemplateColumns='repeat(auto-fit,minmax(400px,1fr))'
        gap='40px'
        justifyContent='center'
        justifyItems='center'
      >
        {dummy.map((_) => (
          <Box
            p='32px 24px 48px 24px'
            bgColor='red.300'
            boxShadow='4px 4px 8px rgba(0,0,0,.3)'
            color='white'
            borderRadius='10px'
            w='400px'
          >
            <HStack mb='24px' align='center' justifyContent='space-between'>
              <Text>Sample</Text>
              <Icon fontSize='24px' as={AiOutlineStock} />
            </HStack>
            <Text fontSize='24px'>P 30,000.00</Text>
            <Text mt='48px' fontSize='14px'>
              Increase by 50%
            </Text>
          </Box>
        ))}
      </Grid>
      <Grid gridTemplateColumns='1fr 1fr' gap='24px'></Grid>
    </ViewLayout>
  );
}

export default Overview;
