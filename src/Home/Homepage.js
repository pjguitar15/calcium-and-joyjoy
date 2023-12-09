import { Box, Heading, VStack } from "@chakra-ui/react";
import ItemCarousel from "../Shared/UI/ItemCarousel";
import Accessories from "./Accessories";
import HeroCarousel from "./HeroCarousel";
import { useGetShoes } from "../Shared/Hooks/useShoes";
import { useEffect } from 'react';

// const { name, image, price, gender, discount, id } = data;

function Homepage() {
  const dummyAccessories = Array.from(
    {
      length: 5,
    },
    (_, i) => ({
      name: "sock",
      price: 400,
      image: "",
      gender: "male",
      id: i,
      discount: 0.1,
    })
  );

  const { data, isLoading } = useGetShoes();

  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <HeroCarousel />
      <Box>
        <Heading mb='24px'>WHAT'S HOT?</Heading>
        <ItemCarousel data={data} />
      </Box>
      <Accessories data={dummyAccessories} />
    </VStack>
  );
}

export default Homepage;
