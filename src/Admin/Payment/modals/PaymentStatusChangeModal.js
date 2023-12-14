import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';

const PaymentStatusChangeModal = ({ isOpen, onClose, paymentMethod, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Payment Method Status Change</ModalHeader>
                <ModalBody>
                    Are you sure you want to change the status of "{paymentMethod?.name}" to {paymentMethod?.active ? 'Inactive' : 'Active'}?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => onConfirm(paymentMethod)}>
                        Confirm
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PaymentStatusChangeModal;
