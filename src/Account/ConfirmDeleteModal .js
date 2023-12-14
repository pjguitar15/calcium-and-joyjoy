import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
  } from "@chakra-ui/react";
  
  function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Removal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to remove this address?</Text>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onConfirm}>
              Remove
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default ConfirmDeleteModal;
  