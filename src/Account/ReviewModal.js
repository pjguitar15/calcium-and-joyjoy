import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  useToast,
  Text,
  Box,
  Flex,
  useTheme,
} from "@chakra-ui/react";
import axiosInstance from "../Shared/utils/axiosInstance";
import { FaStar } from "react-icons/fa";


function ReviewModal({ productId, isOpen, onClose }) {
  const [reviewContent, setReviewContent] = useState('');
  const [starsValue, setStarsValue] = useState(5);
  const toast = useToast();

  
  const theme = useTheme();


  const StarRating = ({ value, onChange }) => {
    return (
      <Flex direction='row' mt={2} mb={4}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <Box
              as="button"
              key={ratingValue}
              onClick={() => onChange(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              _focus={{ outline: 'none' }}
              style={{ cursor: 'pointer' }}
            >
              <FaStar
                color={ratingValue <= (hover || value) ? "#ffc107" : "#e4e5e9"}
                size="24px"
              />
            </Box>
          );
        })}
      </Flex>
    );
  };

  const [hover, setHover] = useState(null);



  const submitReview = async () => {
    console.log("Product ID:", productId); // Debugging: Log the productId
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('No user data in local storage.');
      toastError('You must be logged in to submit a review.');
      return;
    }

    let user;
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error('Error parsing user data:', error);
      toastError('Error parsing user data. Please try again.');
      return;
    }

    if (!user || !user.user_info || !user.user_info.id || !user.token) {
      console.error('Invalid user data:', user);
      toastError('You must be logged in to submit a review.');
      return;
    }

    try {
      await axiosInstance.post('/products/review', {
        user_id: user.user_info.id,
        product_id: productId,
        review_content: reviewContent,
        stars_value: starsValue,
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      toast({
        title: 'Review Submitted',
        description: 'Your review has been successfully submitted!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();  // Close the modal
      setReviewContent('');  // Reset the review content
      setStarsValue(5);  // Reset the stars value
    } catch (error) {
      console.error('Error submitting review:', error);
      toastError('There was an error submitting your review. Please try again.');
    }
  };

  const toastError = (message) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

 
 return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">Leave a Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontWeight="medium">Rating:</Text>
          <StarRating value={starsValue} onChange={setStarsValue} />
          <Textarea
            placeholder='Write your thoughts about the product here...'
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            size="lg"
            mt={2}
            borderColor={theme.colors.gray[300]}
            _hover={{ borderColor: theme.colors.gray[400] }}
            _focus={{ borderColor: theme.colors.blue[500] }}
            borderRadius="8px"
            minHeight="130px"
          />
        </ModalBody>

        <ModalFooter>
          <Button variant='outline' colorScheme='red' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button bgColor='var(--accent)' onClick={submitReview}>Submit Review</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ReviewModal;