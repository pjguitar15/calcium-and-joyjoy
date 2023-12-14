import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';

const StatusChangeModal = ({ isOpen, onClose, coupon, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Status Change</ModalHeader>
                <ModalBody>
                    Are you sure you want to change the status of "{coupon?.name}" to {coupon?.isActive ? 'Inactive' : 'Active'}?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => onConfirm(coupon)}>
                        Confirm
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StatusChangeModal;
