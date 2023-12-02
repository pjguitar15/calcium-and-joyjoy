import { Box, Text } from "@chakra-ui/react";
import "../Home/HeroCarousel.css";
import ShoeList from "../Home/ShoeList";

function CarouselRow({ name, data }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <Box>
      <Text fontSize='24px'>Add {name}</Text>
      <Box maxW='1000px' mx='auto'>
        <ShoeList propSettings={settings} />
      </Box>
    </Box>
  );
}

export default CarouselRow;
