import axios from "axios"
import React, { useEffect, useState } from "react"
import useGetCurrLoggedIn from "../Shared/Hooks/useGetCurrLoggedIn"

const Chatbox = () => {
  const [messageInput, setMessageInput] = useState("")
  const { userId } = useGetCurrLoggedIn()
  const [messages, setMessages] = useState([])
  let intervalId // Declare intervalId outside of the useEffect
  const duration = 15 * 60 * 1000 // 15 minutes in milliseconds
  const interval = 2500 // 1 second

  const fetchData = () => {
    if (userId) {
      axios
        .get(`http://18.223.157.202/backend/api/chat/open_chat/${userId}`)
        .then((res) => {
          const messages = res.data.messages
          const mappedMessages = messages.map((item) => {
            return {
              id: item.id,
              message: item.message,
              sender: item.author.id === userId ? "user" : "admin",
            }
          })
          setMessages(mappedMessages)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const fetchDataLoop = () => {
    // Fetch data initially
    fetchData()

    // Set up interval to fetch data every 1 second
    intervalId = setInterval(() => {
      fetchData()
    }, interval)

    // Clear the interval after the specified duration
    setTimeout(() => {
      clearInterval(intervalId)
    }, duration)
  }

  useEffect(() => {
    // Start the data fetching loop
    fetchDataLoop()

    // Cleanup function to clear the interval when the component unmounts or when userId changes
    return () => {
      // Clear the interval immediately when the user navigates away from the page
      clearInterval(intervalId)

      // No need to clear the interval here since it will be cleared after the specified duration
    }
  }, [userId])

  useEffect(() => {
    const handleVisibilityChange = () => {
      // If the page is not visible, clear the interval
      if (document.hidden) {
        clearInterval(intervalId)
      } else {
        // If the page becomes visible again, restart the interval
        fetchDataLoop()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  const sendMessage = (text) => {
    console.log(text)
    if (userId) {
      axios
        .post(`http://18.223.157.202/backend/api/chat/send_chat/${userId}`, {
          message: messageInput,
        })
        .then((res) => {
          // console.log(res.data)
          setMessageInput("")
        })
    }
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
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
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
