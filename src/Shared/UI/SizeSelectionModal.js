import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Grid } from '@chakra-ui/react';

const SizeSelectionModal = ({ isOpen, onClose, sizes, selectedSize, onSelectSize, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Size</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {sizes.map(size => (
              <Button
                key={size}
                variant={selectedSize === size ? 'solid' : 'outline'}
                onClick={() => onSelectSize(size)}
              >
                {size}
              </Button>
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onConfirm}>
            Add to Cart
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SizeSelectionModal;
