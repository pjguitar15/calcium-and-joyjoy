import { Box, Text } from '@chakra-ui/react';

const ProductDescription = ({ description }) => {
  return (
    <Box gridColumn='span 2' py='16px' borderBlock='solid 1px #d1d1d1'>
      <Text fontWeight='semibold'>Product Description</Text>
      <Text>{description}</Text>
    </Box>
  );
};

export default ProductDescription;
