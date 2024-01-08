import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  VStack,
  Divider
} from "@chakra-ui/react";
import axiosInstance from "../../../Shared/utils/axiosInstance";

const ContactUsList = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyContent, setReplyContent] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axiosInstance.get("/admin/contact");
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleReply = async () => {
        try {
            await axiosInstance.post("/admin/contact/reply", { id: selectedMessage.id, reply: replyContent });
            // Handle success or update UI accordingly
            onClose(); // Close the modal after sending the reply
        } catch (error) {
            console.error("Error replying to message:", error);
        }
    };

    const openReplyModal = (message) => {
        setSelectedMessage(message);
        setReplyContent(""); // Reset reply content
        onOpen();
    };

    return (
        <Box p={5}>
            <Heading mb={6}>Contact Us Messages</Heading>
            {messages.map((message) => (
                <Box key={message.id} borderWidth="1px" borderRadius="md" p={4} my={4} bg="gray.50">
                    <VStack align="stretch" spacing={3}>
                        <Text fontWeight="bold">{message.subject}</Text>
                        <Text fontSize="sm" color="gray.600">From: {message.first_name} {message.last_name} - {message.email}</Text>
                        <Text fontSize="sm" color="gray.600">Received on: {new Date(message.created_at).toLocaleDateString()}</Text>
                        <Divider />
                        <Text>{message.message}</Text>
                        <Button colorScheme="blue" onClick={() => openReplyModal(message)}>
                            Reply
                        </Button>
                    </VStack>
                </Box>
            ))}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reply to Message</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea
                            placeholder="Type your reply here..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleReply}>
                            Send Reply
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ContactUsList;
