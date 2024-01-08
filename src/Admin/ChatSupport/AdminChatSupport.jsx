import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box, Flex, Text, VStack, Heading, Badge, Input, Button, useColorModeValue, HStack,
} from "@chakra-ui/react";
import axiosInstance from "../../Shared/utils/axiosInstance";

const AdminChatSupport = () => {
  const [chatList, setChatList] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [chatsPerPage] = useState(5); // Adjust the number of chats per page as needed
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/admin/chat/list`)
    .then((res) => {
        const mappedRes = res.data.map((item) => ({
          id: item.id,
          customer: item.author.name,
          lastMessage: item.messages.length > 0 ? item.messages[item.messages.length - 1].message : "No messages yet",
          unread: item.unread,
        }));
        setChatList(mappedRes.sort((a, b) => b.id - a.id));
        setFilteredChats(mappedRes);
      });
  }, []);

  useEffect(() => {
    const filtered = chatList.filter(chat =>
      chat.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChats(filtered);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchTerm, chatList]);

  // Pagination logic
  const indexOfLastChat = currentPage * chatsPerPage;
  const indexOfFirstChat = indexOfLastChat - chatsPerPage;
  const currentChats = filteredChats.slice(indexOfFirstChat, indexOfLastChat);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex direction="column" h="100vh" bg={bgColor}>
      <Box p="4" bg="white" borderBottomWidth="1px">
        <Heading as="h1" size="lg">Ongoing Chats</Heading>
      </Box>
      <Box p="4">
        <Input 
          placeholder="Search Chats" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <VStack flex="1" overflowY="auto" p="4" spacing="4">
        {currentChats.map(chat => (
          <Flex
            key={chat.id}
            p="4"
            bg="white"
            borderRadius="lg"
            shadow="md"
            w="full"
            align="center"
            justify="space-between"
            cursor="pointer"
            _hover={{ shadow: "lg" }}
            onClick={() => navigate(`/admin/chat-support/chat/${chat.id}`)}
          >
            <VStack align="start">
              <Text fontWeight="bold">{chat.customer}</Text>
              <Text color="gray.500" fontSize="sm">
                {chat.lastMessage}
              </Text>
            </VStack>
            {chat.unread && <Badge colorScheme="green">New</Badge>}
          </Flex>
        ))}
      </VStack>
      <HStack spacing={4} justifyContent="center" p={4}>
        {Array.from({ length: Math.ceil(filteredChats.length / chatsPerPage) }, (_, i) => i + 1)
          .map(number => (
            <Button key={number} onClick={() => paginate(number)}>{number}</Button>
        ))}
      </HStack>
    </Flex>
  );
};

export default AdminChatSupport;
