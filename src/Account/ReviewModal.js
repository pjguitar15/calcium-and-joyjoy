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
  useDisclosure,
} from "@chakra-ui/react";
import axiosInstance from "../Shared/utils/axiosInstance";

function ReviewModal({ productId }) {
  const [reviewContent, setReviewContent] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleReviewChange = (e) => {
    setReviewContent(e.target.value);
  };
  
  const customOnOpen = () => {
    console.log('Product ID:', productId); // Log the product ID when the modal is opened
    onOpen();
  };

  const submitReview = async () => {
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
  product_id: productId, // Ensure this is included
  review_content: reviewContent,
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

      onClose();
      setReviewContent('');
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
    <>
      <button
        className='border border-red-700 text-red-700 px-4 py-1 rounded-lg ms-2'
        onClick={customOnOpen} // Use the custom onOpen function
        variant='unstyled'
      >
        Review
      </button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave a review</ModalHeader>
          <ModalCloseButton color='red' />
          <ModalBody>
            <Textarea value={reviewContent} onChange={handleReviewChange} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bgColor='var(--accent)' onClick={submitReview}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReviewModal;