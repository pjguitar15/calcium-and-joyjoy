import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  HStack,
  Image,
} from "@chakra-ui/react";
function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        zIndex={99}
        alignItems='start'
        pos='sticky'
        top='0px'
        backdropFilter='auto'
        backdropBlur='10px'
        h='48px'
      >
        <HamburgerIcon mt='8px' ml='16px' fontSize='24px' onClick={onOpen} />
        <Image
          justifySelf='center'
          mx='auto'
          src='/assets/logoheader.png'
          h='80px'
          w='240px'
        />
      </HStack>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerNav;
