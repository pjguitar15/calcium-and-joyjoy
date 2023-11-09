import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "./HeroCarousel.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
function HeroCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box as={Slider} {...settings}>
      <Image src='/sample-hero.png' />
      <Image src='/sample-hero-2.png' />
      <Image src='/sample-hero-3.png' />
    </Box>
  );
}

export default HeroCarousel;

const NextArrow = ({ onClick }) => {
  return (
    <Box
      pos='absolute'
      top='40%'
      right='40px'
      py='40px'
      bgColor='rgba(255,255,255,.4)'
      cursor='pointer'
      transition='all .3s'
      _hover={{ bgColor: "rgba(255,255,255,.8)" }}
      onClick={onClick}
    >
      <ChevronRightIcon fontSize='56px' />
    </Box>
  );
};
const PrevArrow = ({ onClick }) => {
  return (
    <Box
      pos='absolute'
      top='40%'
      left='40px'
      py='40px'
      bgColor='rgba(255,255,255,.4)'
      cursor='pointer'
      transition='all .3s'
      _hover={{ bgColor: "rgba(255,255,255,.8)" }}
      onClick={onClick}
      zIndex={80}
    >
      <ChevronLeftIcon fontSize='56px' />
    </Box>
  );
};
