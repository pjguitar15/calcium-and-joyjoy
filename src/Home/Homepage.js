import { Box, Heading, VStack } from "@chakra-ui/react";
import ShoeList from "./ShoeList";
import Accessories from "./Accessories";
import HeroCarousel from "./HeroCarousel";

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
  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <HeroCarousel />
      <Box>
        <Heading mb='24px'>WHAT'S HOT?</Heading>
        <ShoeList />
      </Box>
      <Accessories data={dummyAccessories} />
    </VStack>
  );
}

export default Homepage;
