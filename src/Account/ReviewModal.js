import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
function ReviewModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        className='border border-red-700 text-red-700 px-4 py-1 rounded-lg ms-2'
        onClick={onOpen}
        variant='unstyled'
      >
        Review
      </button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave a review</ModalHeader>
          <ModalCloseButton color='red' />
          <ModalBody>
            <Textarea />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bgColor='var(--accent)'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReviewModal;
