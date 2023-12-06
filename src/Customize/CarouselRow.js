import { Box, Text } from "@chakra-ui/react";
import "../Home/HeroCarousel.css";
import ItemCarousel, { Arrow } from "../Shared/UI/ItemCarousel";
import { useState } from "react";

function CarouselRow({ name, onItemSelect, data }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,

    nextArrow: <Arrow variant='next' onLast={false} />,
    prevArrow: <Arrow variant='prev' onLast={false} />,
  };
  return (
    <Box>
      <Text fontSize='24px'>Add {name}</Text>
      <Box maxW='1000px' mx='auto'>
        <ItemCarousel
          data={data}
          onItemSelect={onItemSelect}
          propSettings={settings}
        />
      </Box>
    </Box>
  );
}

export default CarouselRow;
