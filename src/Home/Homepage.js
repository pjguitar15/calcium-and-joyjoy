import { Box, Heading, VStack } from "@chakra-ui/react";
import ItemCarousel from "../Shared/UI/ItemCarousel";
import Accessories from "./Accessories";
import HeroCarousel from "./HeroCarousel";
import { useGetAllProducts } from '../Shared/Hooks/useGetAllProducts';
import { useGetAccessories } from '../Shared/Hooks/useGetAccessories';

function Homepage() {
  const { data } = useGetAllProducts();
  const { accessoriesData } = useGetAccessories();


  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <HeroCarousel />
      <Box>
        <Heading mb='24px'>WHAT'S HOT?</Heading>
        <ItemCarousel data={data} />
      </Box>
      <Accessories data={accessoriesData} />
    </VStack>
  );
}

export default Homepage;
