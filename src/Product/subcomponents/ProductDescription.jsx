import { Box, Text, Heading } from '@chakra-ui/react';

const ProductDescription = ({ description }) => {
  return (
    <Box 
      gridColumn='span 2' 
      py='16px' 
      borderBlock='solid 1px #d1d1d1' 
      px='10px'
      backgroundColor='#f9f9f9'
      borderRadius='md'
    >
      <Heading as='h2' size='lg' mb='1rem'>Product Description</Heading>

      <Text 
        fontSize='md' 
        color='gray.700' 
        lineHeight='1.6'
        whiteSpace='pre-line'
      >
        {description}
      </Text>
    </Box>
  );
};

export default ProductDescription;
