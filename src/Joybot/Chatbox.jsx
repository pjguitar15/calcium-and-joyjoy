import axios from "axios"
import React, { useEffect, useState } from "react"
import useGetCurrLoggedIn from "../Shared/Hooks/useGetCurrLoggedIn"

const Chatbox = () => {
  const { userId } = useGetCurrLoggedIn()
  useEffect(() => {
    axios.get(`http://18.223.157.202/backend/api/chat/open_chat/${userId}`).then((res) => {
      
    })
  }, [])

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "user" },
    { id: 2, text: "Hi there!", sender: "bot" },
    // Add more messages as needed
  ])

  const sendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, sender: "user" }
    setMessages([...messages, newMessage])
    // Simulate a bot response (you can replace this with actual logic)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "I am a bot!",
        sender: "bot",
      }
      setMessages([...messages, botResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[700px] bg-gray-100">
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === "user"
                ? "flex justify-end"
                : "flex justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-white text-gray-700 self-start"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value)
              e.target.value = ""
            }
          }}
        />
      </div>
    </div>
  )
}

export default Chatbox
