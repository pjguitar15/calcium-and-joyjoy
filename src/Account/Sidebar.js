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
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

const detailItems = ["Details", "Order Details", "Delivery Addresses"];

function Sidebar({ onSelect }) {
  const [selected, setSelected] = useState("Details");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (ui) => {
    setSelected(ui);
    onSelect(ui);
  };
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>Log out? talagurr?</ModalBody>
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
