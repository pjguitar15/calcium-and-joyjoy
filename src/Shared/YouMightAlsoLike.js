import { Box, Heading, Grid } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
function YouMightAlsoLike() {
  const dummy = Array.from({ length: 3 });
  return (
    <Box maxW='1100px' mx='auto'>
      <Heading mt='120px' mb='48px' fontSize='24px' fontWeight='semibold'>
        You Might Also Like
      </Heading>
      <Grid gridTemplateColumns='repeat(3,1fr)'>
        {dummy.map(() => (
          <ItemCard img='/heroSocks.png' title={`Sting energy drink`} />
        ))}
      </Grid>
    </Box>
  );
}

export default YouMightAlsoLike;
