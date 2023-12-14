import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormLabel,
  FormControl,
  GridItem,
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
    const { street, bldg, city, barangay, postCode, label } = data;
    const finalAddress = {
      user_id: `${userInfo.id}`,
      first_name: `${userInfo.firstname}`,
      last_name: `${userInfo.lastname}`,
      street_address: `${street}`,
      building_address: `${bldg}`,
      province: ``,
      city_municipality: `${city}`,
      barangay: `${barangay}`,
      postal_code: `${postCode}`,
      email: `${userInfo.email}`,
      phone_number: `${userInfo.phone_number}`,
      label: `${label}`,
      region: region
    };

    const newUserInfo = { ...userInfo, address: finalAddress };

    try {
      await axiosInstance.post(
        "/user/address/store",
        { finalAddress },
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
      toast({
        status: "success",
        position: "top",
        title: "Address saved.",
        description: "Your address has been successfully saved.",
      });
      onReload();
      setTimeout(() => {
        onReload();
      }, 700);
    } catch (e) {
      toast({
        status: "error",
        position: "top",
        title: "Something went wrong.",
        description: "Unable to save the address.",
      });
    }

    onClose();
    setRegion("");
    reset();
  };

  const { mutate } = useMutation({
    mutationKey: "address",
    mutationFn: handleSave,
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme='blue'>
        Add Address
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(mutate)}>
              <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Label</FormLabel>
                    <Input placeholder='Home, Office, etc.' {...register("label")} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Street Address</FormLabel>
                    <Input placeholder='123 Main St' {...register("street")} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Building Name</FormLabel>
                    <Input placeholder='Building Name' {...register("bldg")} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>City/Municipality</FormLabel>
                    <Input placeholder='City' {...register("city")} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Barangay</FormLabel>
                    <Input placeholder='Barangay' {...register("barangay")} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Postal Code</FormLabel>
                    <Input placeholder='Postal Code' {...register("postCode")} />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Region</FormLabel>
                    <RegionDropdown
                      country='Philippines'
                      value={region}
                      onChange={(val) => setRegion(val)}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button type='submit' colorScheme='blue' mt={4} w="full">
                    Save Address
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddressModal;