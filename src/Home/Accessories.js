import { Box, Heading, Circle } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import ItemCard from "../Shared/ItemCard";

import Slider from "react-slick";
import { useState } from "react";

function Accessories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: (
      <Arrow variant='next' onLast={activeIndex === 5 ? true : false} />
    ),
    prevArrow: (
      <Arrow variant='prev' onLast={activeIndex === 0 ? true : false} />
    ),
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
