import { VStack } from "@chakra-ui/react";
import ShoeList from "./ShoeList";
import Accessories from "./Accessories";
import HeroCarousel from "./HeroCarousel";

function Homepage() {
  return (
    <VStack align='normal' justify='normal' gap='80px'>
      <HeroCarousel />

      <ShoeList />
      {/* <Accessories /> */}
    </VStack>
  );
}

export default Homepage;
