import React from 'react';
import { 
    FormControl, 
    FormLabel, 
    Input, 
    Grid, 
    Heading, 
    Text, 
    Button, 
    Tooltip, 
    useToast, 
    Box, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    useDisclosure 
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Shared/utils/axiosInstance";
import useRefetchUser from "../Shared/Hooks/useRefetchUser";

// Form Field Component
const FormField = ({ id, label, defaultValue, register, errors, type = "text", gridColumn, tooltip, isReadOnly = false }) => (
    <FormControl isInvalid={errors[id]} gridColumn={gridColumn}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
        <Tooltip label={tooltip || ""} shouldWrapChildren mt='3'>
            <Input
                id={id}
                {...register(id)}
                type={type}
                placeholder={label}
                defaultValue={defaultValue}
                size="md"
                isReadOnly={isReadOnly}
            />
        </Tooltip>
        {errors[id] && <Text color='red.500' fontSize='sm'>{errors[id].message}</Text>}
    </FormControl>
);

function AccountDetails() {
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { refetch } = useRefetchUser();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        navigate("/");
        return null;
    }

    const { firstname, lastname, email, phone_number } = user.user_info;

    const onSubmit = (data) => {
        onOpen(); // Open confirmation modal
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('phone_number', phone_number);

            const updateResponse = await axiosInstance.post('/user/update', formData, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            const updatedUser = { user_info: updateResponse.data.data };
            localStorage.setItem("user", JSON.stringify({ ...updatedUser, token: user?.token }));

            toast({
                title: "Account updated.",
                description: "Your account details have been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating account.",
                description: "There was an issue updating your account details. " + error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            onClose(); // Close modal after update
        }
    };

    return (
        <Box p={4} w="100%">
            <Heading size='lg' mb={4}>Account Details</Heading>
            <Text mb={8}>Update your personal information and contact details.</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6}>
                    <FormField id="firstname" label="First Name" defaultValue={firstname} register={register} errors={errors} gridColumn={{ base: "1", md: "1 / 2" }} />
                    <FormField id="lastname" label="Last Name" defaultValue={lastname} register={register} errors={errors} gridColumn={{ base: "1", md: "2 / 3" }} />
                    <FormField id="email" label="Email" defaultValue={email} register={register} errors={errors} gridColumn={{ base: "1 / -1", md: "1 / 4" }} isReadOnly />
                    <FormField id="password" label="Password" type="password" register={register} errors={errors} gridColumn={{ base: "1 / -1", md: "1 / 4" }} />
                    <FormField id="phone_number" label="Phone Number" defaultValue={phone_number} type="tel" tooltip="Include country code if applicable" register={register} errors={errors} gridColumn={{ base: "1 / -1", md: "1 / 4" }} />
                    <Button type="submit" colorScheme='blue' size="lg" w="full" gridColumn={{ base: "1 / -1", md: "1 / 4" }}>Update Details</Button>
                </Grid>
            </form>

            {/* Confirmation Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to update your account details?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
                            Confirm
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AccountDetails;
