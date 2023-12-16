import React, { useState } from 'react';
import { Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";

const ImageView = ({ imageUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Thumbnail in the table */}
            <Image 
                src={imageUrl} 
                alt="Receipt" 
                boxSize="100px" 
                objectFit="cover" // Keeps aspect ratio, crops if necessary
                onClick={() => setIsOpen(true)} 
                cursor="pointer" 
            />
            {/* Larger view in modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Receipt Image</ModalHeader>
                    <ModalCloseButton />
                    <Image 
                        src={imageUrl} 
                        alt="Receipt" 
                        maxW="100%" // Ensures the image does not exceed the modal's width
                        maxH="90vh" // Ensures the image does not exceed the viewport's height
                        objectFit="contain" // Ensures full image is visible
                    />
                </ModalContent>
            </Modal>
        </>
    );
};

export default ImageView;
