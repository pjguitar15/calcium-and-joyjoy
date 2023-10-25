import { Box, Heading, Circle } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import ItemCard from "../Shared/ItemCard";

import Slider from "react-slick";
import { useState } from "react";

const dummy = Array.from({ length: 5 });

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
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          nextArrow: (
            <Arrow
              variant='next'
              onLast={activeIndex === dummy.length - 4 ? true : false}
            />
          ),
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          nextArrow: (
            <Arrow
              variant='next'
              onLast={activeIndex === dummy.length - 3 ? true : false}
            />
          ),
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: (
            <Arrow
              variant='next'
              onLast={activeIndex === dummy.length - 2 ? true : false}
            />
          ),
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: (
            <Arrow
              variant='next'
              onLast={activeIndex === dummy.length - 1 ? true : false}
            />
          ),
        },
      },
    ],
  };

  return (
    <Box>
      <Heading mb='24px'>ACCESSORIES</Heading>
      <Box as={Slider} {...settings}>
        {dummy.map((_, i) => {
          return (
            <Box py='16px' key={i}>
              <ItemCard
                title={`Nike socks ${i + 1}`}
                img='/dummySocks.png'
                discount={0.1}
              />
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
