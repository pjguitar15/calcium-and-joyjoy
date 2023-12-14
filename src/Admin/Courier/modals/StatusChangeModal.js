import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';

const StatusChangeModal = ({ isOpen, onClose, courier, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Status Change</ModalHeader>
                <ModalBody>
                    Are you sure you want to change the status of "{courier?.courier_name}" to {courier?.active === 1 ? 'Inactive' : 'Active'}?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => onConfirm(courier)}>
                        Confirm
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StatusChangeModal;
