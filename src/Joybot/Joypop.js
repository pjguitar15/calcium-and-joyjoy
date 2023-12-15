import React from 'react';
import {
  Box,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import ChatbotPage from './Chatbotpage';

function Joypop() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  const handleClick = () => {
    onOpen();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Center
          zIndex={99}
          cursor='pointer'
          w='80px'
          aspectRatio='1/1'
          bgColor='#DE5050'
          borderRadius='full'
          pos='fixed'
          bottom='24px'
          right='16px'
          fontSize='40px'
          fontWeight='extrabold'
          color='#F8EB26'
          textShadow='0 2px 4px black'
          css={{
            WebkitTextStroke: "4px black",
          }}
          border='solid 2px black'
          onClick={handleClick}
        >
         J
        </Center>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Box>Welcome to Calcium and joyjoy store!</Box>
            onClick={handleClick}
          </PopoverBody>
        </PopoverContent>
      </Portal>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chatbot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChatbotPage /> {/* Displaying ChatbotPage content inside the modal */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Popover>
  );
}

export default Joypop;