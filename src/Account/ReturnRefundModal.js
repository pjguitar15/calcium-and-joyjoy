import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const ReturnRefundModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Return and Refund Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          We currently do not offer a return or refund policy. For any concerns or queries, please contact us on our Facebook page: <a href="https://www.facebook.com/calciumjoyjoyph27" target="_blank" rel="noopener noreferrer">calciumjoyjoyph27</a>.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReturnRefundModal;
