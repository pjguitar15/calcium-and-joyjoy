import {
  Box,
  VStack,
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const detailItems = ["Details", "Order Details", "Delivery Addresses"];

function Sidebar({ onSelect }) {
  const [selected, setSelected] = useState("Details");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSelect = (ui) => {
    setSelected(ui);
    onSelect(ui);
  };

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
      <Box pos='relative'>
        <VStack gap='32px' align='start'>
          {detailItems.map((item) => (
            <Box
              borderBottom={selected === item ? "solid 1px black" : ""}
              pb='16px'
              w='90%'
              key={item}
            >
              <Button
                color={selected === item ? "black" : "gray.500"}
                fontSize='24px'
                variant='unstyled'
                fontWeight='normal'
                onClick={() => handleSelect(item)}
              >
                {item}
              </Button>
            </Box>
          ))}
          <Button
            fontSize='24px'
            fontWeight='semibold'
            color='red.500'
            variant='unstyled'
            onClick={onOpen}
          >
            Logout
          </Button>
        </VStack>
        <Divider
          pos='absolute'
          right='0'
          top='0'
          orientation='vertical'
          borderColor='black'
        />
      </Box>
    </>
  );
}

export default Sidebar;
