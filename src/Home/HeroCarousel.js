import React, { useEffect, useState } from 'react';
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import axiosInstance from '../Shared/utils/axiosInstance'; 
import "./HeroCarousel.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function HeroCarousel() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axiosInstance.get('/admin/home_slider')
      .then(response => {
        setSlides(response.data);
      })
      .catch(error => {
        console.error("Error fetching slider images:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true, 
    autoplaySpeed: 2000, 
  };

  return (
    <Box as={Slider} {...settings}>
      {slides.map(slide => (
        <Image key={slide.id} src={slide.image_url} className="carousel-image" />
      ))}
    </Box>
  );
}

export default HeroCarousel;

const NextArrow = ({ onClick }) => {
  return (
    <Box
      pos='absolute'
      top='50%'
      transform='translateY(-50%)'
      right={{ base: "16px", md: "40px" }}
      py={{ md: "40px", base: "24px" }}
      bgColor='transparent'
      cursor='pointer'
      transition='all .3s'
      _hover={{ bgColor: "rgba(255,255,255,.8)" }}
      onClick={onClick}
      opacity={{ base: 0, md: 1 }}
      pointerEvents={{ base: "none", md: "auto" }}
    >
      <ChevronRightIcon fontSize={{ base: "40px", md: "56px" }} />
    </Box>
  );
};
const PrevArrow = ({ onClick }) => {
  return (
    <Box
      pos='absolute'
      top='50%'
      transform='translateY(-50%)'
      left={{ md: "40px", base: "16px" }}
      py={{ md: "40px", base: "24px" }}
      bgColor='transparent'
      cursor='pointer'
      transition='all .3s'
      _hover={{ bgColor: "rgba(255,255,255,.8)" }}
      onClick={onClick}
      zIndex={80}
      opacity={{ base: 0, md: 1 }}
      pointerEvents={{ base: "none", md: "auto" }}
    >
      <ChevronLeftIcon fontSize={{ base: "40px", md: "56px" }} />
    </Box>
  );
};
