import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  useDisclosure,
  Button,
  VStack,
  Input,
  HStack,
  Select,
  Grid,
} from "@chakra-ui/react";
import { RegionDropdown } from "react-country-region-selector";
import { useForm } from "react-hook-form";
import { useState } from "react";
function AddressModal() {
  const [region, setRegion] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, reset } = useForm();

  const handleSave = (data) => {
    console.log(data);
    onClose();
    setRegion("");
    reset();
  };

  return (
    <>
      <Button
        color='white'
        bgColor='black'
        borderRadius='20px'
        px='40px'
        _hover={{
          bgColor: "var(--accent)",
        }}
        onClick={onOpen}
      >
        Add Address
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px='16px'>
          <ModalHeader mb='24px'>Add Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              as='form'
              align='normal'
              onSubmit={handleSubmit(handleSave)}
              gap='16px'
            >
              <Input placeholder='Street address' {...register("street")} />
              <Input placeholder='Building name' {...register("bldg")} />
              <Grid gridTemplateColumns='repeat(2,1fr)' gap='8px'>
                <Select
                  as={RegionDropdown}
                  defaultOptionLabel='Select region'
                  value={region}
                  onChange={(e) => setRegion(e)}
                  country='Philippines'
                />
                <Input placeholder='City/Municipality' {...register("city")} />
                <Input placeholder='Barangay' {...register("barangay")} />
                <Input placeholder='Postal Code' {...register("postCode")} />
              </Grid>

              <Button
                color='white'
                bgColor='black'
                borderRadius='20px'
                px='40px'
                _hover={{
                  bgColor: "var(--accent)",
                }}
                type='submit'
                w='fit-content'
                ml='auto'
                mt='16px'
              >
                Save
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddressModal;
