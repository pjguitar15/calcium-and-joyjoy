import { useState, useEffect } from 'react';
import { Box, Image, VStack } from '@chakra-ui/react';

const ProductImages = ({ mainImage, imageList }) => {
  // State to manage the currently displayed image
  const [display, setDisplay] = useState(mainImage);

  // Update display whenever mainImage changes
  useEffect(() => {
    setDisplay(mainImage);
  }, [mainImage]);

  // Extract URLs from the imageList
  const imageUrls = imageList.map(img => img.image_url);

  // Combine main image with the image URLs
  const combinedImageList = [mainImage, ...imageUrls.filter(url => url !== mainImage)];

  return (
    <VStack px='40px' borderRadius='10px' h='100%' alignItems='start' justify='center' position='relative'>
      <VStack position='absolute' left='-100px' top='0'>
        {combinedImageList.map((img, i) => (
          <Box
            key={i}
            bgColor='gray.100'
            p='8px'
            borderRadius='10px'
            filter={display === img ? 'brightness(.8)' : ''}
            cursor='pointer'
            onClick={() => setDisplay(img)}
          >
            <Image w='64px' h='64px' src={img} alt={`Thumbnail ${i}`} />
          </Box>
        ))}
      </VStack>
      <Image mt='40px' maxW='320px' src={display} alt='Displayed Product' />
    </VStack>
  );
};

export default ProductImages;
