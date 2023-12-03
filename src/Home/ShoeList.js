import { Box, Circle, Heading } from "@chakra-ui/react";
import ItemCard from "../Shared/UI/ItemCard";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";

const dummy = Array.from({ length: 15 });
function ShoeList({ propSettings, onItemSelect }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const handleSelect = (item) => {
    setSelected(item.id);
    onItemSelect(item);
  };

  const getShoes = async () => {
    const res = await axiosInstance.get("/shoes");
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: "shoes",
    queryFn: getShoes,
  });

  if (isLoading) return <LoadingSpinner />;

  const settings = {
    dots: false,
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

export default ShoeList;

const Arrow = ({ onClick, variant, onLast }) => {
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
