// ChatWithUser.js

import React, { useState } from "react"

const ChatWithUser = ({ selectedUser }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello there!", sender: "customer" },
    { id: 2, text: "Hi! How can I help you?", sender: "admin" },
    // Add more messages as needed
  ])

  const sendMessage = (text) => {
    const newMessage = { id: messages.length + 1, text, sender: "admin" }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold">{selectedUser}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === "customer"
                ? "flex justify-start"
                : "flex justify-end"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === "customer"
                  ? "bg-white text-gray-700 self-start"
                  : "bg-blue-500 text-white self-end"
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

export default ChatWithUser
