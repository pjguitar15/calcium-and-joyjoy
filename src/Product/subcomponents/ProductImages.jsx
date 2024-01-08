import { useState, useEffect, useRef } from 'react';
import { Box, Image, VStack } from '@chakra-ui/react';
import Slider from 'react-slick';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";



const ProductImages = ({ mainImage, imageList }) => {
  const [display, setDisplay] = useState(mainImage);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const sliderRef = useRef();

  useEffect(() => {
    setDisplay(mainImage);
  }, [mainImage]);

  const imageUrls = imageList.map(img => img.image_url);
  const combinedImageList = [mainImage, ...imageUrls.filter(url => url !== mainImage)];

  // Settings for the react-slick slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: true,
    beforeChange: (current, next) => setDisplay(combinedImageList[next]),
    arrows: true, // Enable arrows
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const handleThumbnailClick = index => {
    sliderRef.current.slickGoTo(index);
  };

  const openModal = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <VStack spacing="4" alignItems="center" justify="center">
      <Box width="500px" height="500px" overflow="hidden" position="relative" borderRadius="lg">
        <Slider {...settings} ref={sliderRef}>
          {combinedImageList.map((img, i) => (
            <Box key={i} height="500px" width="100%" onClick={() => openModal(img)}>
              <Image
                src={img}
                alt={`Product Image ${i}`}
                boxSize="500px"
                objectFit="cover"
                transition="0.3s ease-in-out"
                borderRadius="lg"
                cursor="pointer"
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <Box display="flex" justifyContent="center" mt="2">
        {combinedImageList.map((img, i) => (
          <Box
            key={i}
            p="2"
            m="0 5px"
            cursor="pointer"
            border="2px solid"
            borderColor={display === img ? "blue.500" : "transparent"}
            onClick={() => handleThumbnailClick(i)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i}`}
              boxSize="80px"
              objectFit="cover"
            />
            
          </Box>
          
        ))}
      </Box>
            {/* Modal for image preview */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image
            src={selectedImage}
            alt="Zoomed Image"
            maxWidth="90%"  // Adjust the max width as needed
            maxHeight="90%" // Adjust the max height as needed
            objectFit="contain" // Ensures the image maintains its aspect ratio
            m="auto" // Centers the image in the modal
          />
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ProductImages;
// Custom Arrow Components
const NextArrow = ({ onClick }) => {
  return (
    <Box
      position="absolute"
      top="0"
      bottom="0"
      right="0"
      width="100px" // Width of the clickable area
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      paddingRight="20px" // Padding for the arrow icon
      cursor="pointer"
      onClick={onClick}
      // You can add a background color with opacity for better visibility if needed
    >
      <ChevronRightIcon w={6} h={6} />
    </Box>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <Box
      position="absolute"
      top="0"
      bottom="0"
      left="0"
      width="100px" // Width of the clickable area
      display="flex"
      alignItems="center"
      paddingLeft="20px" // Padding for the arrow icon
      cursor="pointer"
      onClick={onClick}
      zIndex={2} // Ensure it's above other elements
    >
      <ChevronLeftIcon w={6} h={6} />
    </Box>
  );
};

