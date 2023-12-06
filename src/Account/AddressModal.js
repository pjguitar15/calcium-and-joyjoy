import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  Input,
  Select,
  Grid,
  useToast,
} from "@chakra-ui/react";
import { RegionDropdown } from "react-country-region-selector";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";
function AddressModal({ onReload }) {
  const [region, setRegion] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  const userInfo = user?.user_info;

  const handleSave = async (data) => {
    const { street, bldg, city, barangay, postCode } = data;
    const finalAddress = `${bldg}, ${street}, ${barangay}, ${city}, ${region} ${postCode}`;

    const newUserInfo = { ...userInfo, address: finalAddress };

    try {
      await axiosInstance.post(
        "/user/update",
        { address: finalAddress },
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: user.token,
          user_info: { ...newUserInfo },
        })
      );
      setTimeout(() => {
        onReload();
      }, 700);
    } catch (e) {
      throw new Error();
    }

    onClose();
    setRegion("");
    reset();
  };

  const { mutate } = useMutation({
    mutationKey: "address",
    mutationFn: handleSave,
    onSuccess: () => {
      toast({
        status: "success",
        position: "top",
        title: "Address saved.",
        description: "Reloading page",
      });
    },
    onError: (e) => {
      toast({
        status: "error",
        position: "top",
        title: "Something went wrong.",
      });
    },
  });

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
              onSubmit={handleSubmit(mutate)}
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
              <Input placeholder='Add label' {...register("label")} />
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
