import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";

const ActionButtons = ({ id, paymentStatus, updatePaymentStatus }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUpdateStatus = () => {
        onOpen();
    };

    const confirmUpdateStatus = (action) => {
        updatePaymentStatus(id, action);
        onClose();
    };

    if (paymentStatus === 'verified') {
        return <span>VERIFIED</span>;
    }

    if (paymentStatus === 'rejected') {
        return <span>REJECTED</span>;
    }

    return (
        <>
            <Button colorScheme='blue' onClick={handleUpdateStatus}>
                Update Status
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Payment Status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Would you like to verify or reject this payment?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={() => confirmUpdateStatus('verified')}>
                            Verify
                        </Button>
                        <Button colorScheme="red" onClick={() => confirmUpdateStatus('rejected')}>
                            Reject
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ActionButtons;
