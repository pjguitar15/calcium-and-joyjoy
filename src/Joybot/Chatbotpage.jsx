import React, { useEffect, useState } from "react"
import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react"
import useGetCurrLoggedIn from "../Shared/Hooks/useGetCurrLoggedIn"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ChatbotPage = () => {
  const [isNewChat, setIsNewChat] = useState(true)
  const { userId } = useGetCurrLoggedIn()
  const navigate = useNavigate()

  // Check if curr user is first time with chat
  useEffect(() => {
    console.log(userId)
    if (userId) {
      axios
        .get(`http://18.223.157.202/backend/api/chat/check/${userId}`)
        .then((res) => {
          console.log(res)
          if (res) {
            setIsNewChat(false)
            console.log("should go to chat box")
          }
        })
        .catch((err) => {
          const responseData = err.response.data[0]
          console.log("Response Data", responseData)
          if (responseData === "Chat not found") {
            setIsNewChat(true)
          } else {
            setIsNewChat(false)
          }
        })
    }
  }, [userId])

  // if not first time, navigate to chatbox
  useEffect(() => {
    if (!isNewChat) {
      navigate("/chat/chatbox")
    }
  }, [isNewChat])

  const handleNewChat = () => {
    axios
      .post(`http://18.223.157.202/backend/api/chat/start_chat/${userId}`)
      .then((res) => {
        const response = res.data[0]
        if (response === "chat started") {
          navigate("/chat/chatbox")
        } else {
          console.log("Something is wrong")
        }
      })
  }

  const handleFaqClick = () => {
    navigate("/faq")
  }
  return (
    <Box>
      <Heading as="h1" size="xl" mb={6}>
        Welcome to Joybot
      </Heading>
      <Text fontSize="lg" mb={4}>
        Click to start or get help
      </Text>
      <Flex direction="column" align="center" gap={4}>
        <Button onClick={handleNewChat} colorScheme="blue" w="full">
          Start a new chat!
        </Button>
        <Button onClick={handleFaqClick} colorScheme="green" w="full">
          Need Help? / FAQ
        </Button>
      </Flex>
    </Box>
  );
};
export default ChatbotPage
