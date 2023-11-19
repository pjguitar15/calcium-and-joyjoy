import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  HStack,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
function LogoutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = async () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "Going back to home page",
      status: "info",
      position: "top",
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <>
      <Button
        fontSize='24px'
        fontWeight='semibold'
        color='red.500'
        variant='unstyled'
        onClick={onOpen}
      >
        Logout
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody py='40px' px='32px'>
            <Text
              fontSize='18px'
              fontWeight='semibold'
              mb='32px'
              textAlign='center'
            >
              Are you sure you want to log out?
            </Text>
            <HStack gap='64px' justify='center'>
              <Button
                color='white'
                bgColor='var(--primary)'
                borderRadius='20px'
                px='32px'
                py='16px'
                _hover={{
                  bgColor: "",
                }}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                color='white'
                bgColor='var(--primary)'
                borderRadius='20px'
                px='32px'
                py='16px'
                _hover={{
                  bgColor: "",
                }}
                onClick={handleLogout}
              >
                Yes
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LogoutModal;
