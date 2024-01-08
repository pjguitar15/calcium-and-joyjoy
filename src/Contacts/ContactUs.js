import React, { useState } from 'react';
import axiosInstance from '../Shared/utils/axiosInstance';
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Heading,
  Image,
  VStack,
  Grid
} from "@chakra-ui/react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/contact', formData);
            console.log(response.data);
            onOpen();
        } catch (error) {
            console.error(error);
        }
    };

    const formBackground = useColorModeValue("white", "gray.700");

    return (
        <Flex 
            minH="100vh"
            align="center"
            justify="center"
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Box
                p={8}
                width="full"
                maxWidth="800px"
                borderWidth={1}
                borderRadius="xl"
                boxShadow="lg"
                bg={formBackground}
            >
                <VStack spacing={4}>
                    <Image src="/assets/logoheader.png" alt="Shoe Store Logo" />
                    <Heading as="h1" size="xl" color="red.500">
                        Get in Touch
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4} width="full">
                            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={6}>
                                <FormControl isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input type="text" size="lg" name="first_name" value={formData.first_name} onChange={handleChange} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input type="text" size="lg" name="last_name" value={formData.last_name} onChange={handleChange} />
                                </FormControl>
                            </Grid>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" size="lg" name="email" value={formData.email} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Subject</FormLabel>
                                <Input type="text" size="lg" name="subject" value={formData.subject} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Message</FormLabel>
                                <Textarea size="lg" height="150px" name="message" value={formData.message} onChange={handleChange} />
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="red"
                                size="lg"
                                width="full"
                                _hover={{ bg: 'red.600' }}
                            >
                                Submit
                            </Button>
                        </VStack>
                    </form>
                </VStack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Form Submitted</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Thank you for reaching out to us. We will get back to you as soon as possible!
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </Flex>
    );
};

export default ContactUs;
