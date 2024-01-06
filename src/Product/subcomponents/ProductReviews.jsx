import { Box, Text, VStack, Heading, Divider, Flex, Icon, Badge } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';



const Reviews = ({ reviews, rating }) => {
  return (
    <VStack
      spacing={5}
      gridColumn='span 2'
      py='16px'
      borderBlock='solid 1px #d1d1d1'
      alignItems='start'
      borderRadius='md'
      p={5}
    >
      <Heading as='h3' size='lg' fontWeight='semibold'>
        Customer Reviews
      </Heading>
      <Flex align='center'>
        <Text fontWeight='semibold' fontSize={{ base: 'md', md: 'lg' }} mr={2}>
          Average Rating:
        </Text>
        <Badge colorScheme='green' px={3} py={1} borderRadius='md' fontSize='lg'>
          {rating.toFixed(2)}
        </Badge>
        {[...Array(Math.round(rating))].map((e, i) => <Icon as={FaStar} key={i} color='yellow.500' ml={1} />)}
      </Flex>
      <VStack spacing='12px' align='stretch' w='100%'>
        {reviews.map((review) => (
          <Box
            key={review.id}
            p='12px'
            border='1px solid #e2e8f0'
            borderRadius='md'
          >
            <Text fontWeight='bold'>{`User ${review.user_id}`}</Text>
            <Flex align='center' mb={2}>
              <Text fontSize='sm' mr={2}>{`Rating: `}</Text>
              {[...Array(review.stars_value)].map((e, i) => <Icon as={FaStar} key={i} color='yellow.500' ml={1} />)}
            </Flex>
            <Divider my='8px' />
            <Text fontSize='sm'>{review.review_content}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
};

export default Reviews;
