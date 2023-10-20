import { Box, Heading, Circle } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import ItemCard from "../Shared/ItemCard";

import Slider from "react-slick";

function Accessories() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  const dummy = Array.from({ length: 5 });
  return (
    <Box>
      <Heading mb='24px'>WHAT'S HOT?</Heading>
      <Box as={Slider} {...settings}>
        {dummy.map((_, i) => {
          return (
            <Box py='16px' key={i}>
              <ItemCard title={i + 1} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Accessories;

const Arrow = ({ onClick, variant, onLast }) => {
  return (
    <Circle
      opacity={onLast ? 0 : 1}
      pointerEvents={onLast ? "none" : "auto"}
      fontSize='40px'
      pos='absolute'
      left={variant === "prev" ? "16px" : ""}
      right={variant === "next" ? "16px" : ""}
      top='50%'
      transform='translateY(-60%)'
      zIndex={90}
      onClick={onClick}
      cursor='pointer'
      bgColor='gray.500'
      color='white'
    >
      {variant === "next" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </Circle>
  );
};
