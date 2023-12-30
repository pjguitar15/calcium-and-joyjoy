import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Grid, VStack, HStack } from '@chakra-ui/react';

const SizeSelectionModal = ({ isOpen, onClose, sizes, selectedSize, onSelectSize, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent mx={5} my={10}>
        <ModalHeader fontSize="lg" fontWeight="bold">Select Size</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {sizes.map(size => (
              <Button
                key={size}
                variant={selectedSize === size ? 'solid' : 'outline'}
                borderColor={selectedSize === size ? "#daa520" : "gray.300"}
                borderWidth={selectedSize === size ? "2px" : "1px"}
                color={selectedSize === size ? "#daa520" : "gray.800"}
                _hover={{ bg: selectedSize === size ? "#fff5c9" : "gray.100" }}
                onClick={() => onSelectSize(size)}
              >
                {size}
              </Button>
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <VStack spacing="4">
            <HStack spacing="4" w="full">
              <Button 
                onClick={onConfirm} 
                bgColor='gray' 
                _hover={{ bgColor: "var(--accent)" }}
                color='white' 
                borderRadius='20px' 
                w="full"
              >
                Add to Cart
              </Button>
            </HStack>
          </VStack>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SizeSelectionModal;
