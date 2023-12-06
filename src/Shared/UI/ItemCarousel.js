import { Box, Circle } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

import LoadingSpinner from "./LoadingSpinner";

function ItemCarousel({ propSettings, onItemSelect, data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const handleSelect = (item) => {
    setSelected(item.id);
    onItemSelect(item);
  };

  if (!data) return <LoadingSpinner />;

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: (
      <Arrow
        variant='next'
        onLast={activeIndex === data.length - 5 ? true : false}
      />
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
              onLast={activeIndex === data.length - 4 ? true : false}
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
              onLast={activeIndex === data.length - 3 ? true : false}
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
              onLast={activeIndex === data.length - 2 ? true : false}
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
              onLast={activeIndex === data.length - 1 ? true : false}
            />
          ),
        },
      },
    ],
  };

  return (
    <Box as={Slider} {...settings} {...propSettings}>
      {data.map((item, i) => {
        return (
          <Box py='16px' key={i}>
            <ItemCard
              onSelect={handleSelect}
              variant='shoe'
              data={item}
              isSelected={item.id === selected}
            />
          </Box>
        );
      })}
    </Box>
  );
}

export default ItemCarousel;

export const Arrow = ({ onClick, variant, onLast }) => {
  return (
    <Circle
      opacity={onLast ? 0 : 1}
      pointerEvents={onLast ? "none" : "auto"}
      fontSize='40px'
      pos='absolute'
      left={variant === "prev" ? "-8px" : ""}
      right={variant === "next" ? "-8px" : ""}
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
