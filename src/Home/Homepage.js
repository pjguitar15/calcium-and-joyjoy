import { Box, Heading, VStack } from "@chakra-ui/react";
import ItemCarousel from "../Shared/UI/ItemCarousel";
import Accessories from "./Accessories";
import RecommendedProducts from "./RecommendedProducts"; 
import HeroCarousel from "./HeroCarousel";
import { useGetAllProducts } from '../Shared/Hooks/useGetAllProducts';
import { useGetAccessories } from '../Shared/Hooks/useGetAccessories';
import { useGetRecommendedProducts } from '../Shared/Hooks/useGetRecommendedProducts'; 

function Homepage() {
  const { data } = useGetAllProducts();
  const { accessoriesData } = useGetAccessories();
  const { recommendedData } = useGetRecommendedProducts(); 

  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <HeroCarousel />
      <Box>
        <Heading mb='24px'>WHAT'S HOT?</Heading>
        <ItemCarousel data={data} />
      </Box>
      <RecommendedProducts data={recommendedData} /> 
      <Accessories data={accessoriesData} />
    </VStack>
  );
}

export default Homepage;
