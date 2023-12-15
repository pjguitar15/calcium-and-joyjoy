import React, { useEffect, useState } from "react"
import { Box, Heading, Text, Button } from "@chakra-ui/react"
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
          console.log(res.data.data)
        })
        .catch((err) => {
          const responseData = err.response.data[0]
          if (responseData === "Chat not found") {
            setIsNewChat(true)
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

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Joybot
      </Heading>
      <Text className="text-xl font-semibold" fontSize="lg" mb={2}>
        Click Start a new chat
      </Text>
      <Button onClick={handleNewChat} colorScheme="blue">
        Start a new chat!
      </Button>
    </Box>
  )
}

export default ChatbotPage
