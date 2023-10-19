import { Box, HStack, Heading } from "@chakra-ui/react";
import ItemCard from "../Shared/ItemCard";
function ShoeList() {
  const dummy = Array.from({ length: 5 });
  return (
    <Box>
      <Heading mb='24px'>WHAT'S HOT?</Heading>
      <HStack gap='40px' justify='center'>
        {dummy.map((_, i) => {
          return <ItemCard key={i} />;
        })}
      </HStack>
    </Box>
  );
}

export default ShoeList;
