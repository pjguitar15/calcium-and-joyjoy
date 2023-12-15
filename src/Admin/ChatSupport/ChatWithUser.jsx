import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useGetCurrAdmin from "../../Shared/Hooks/useGetCurrAdmin"

const ChatWithUser = () => {
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState([])
  const { userId } = useGetCurrAdmin()
  let intervalId // Declare intervalId outside of the useEffect
  const duration = 15 * 60 * 1000 // 15 minutes in milliseconds
  const interval = 200 // 1 second
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchData = () => {
    if (id) {
      axios
        .get(`http://18.223.157.202/backend/api/admin/chat/open/${id}`)
        .then((res) => {
          // console.log(res.data.messages)
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
  }, [])

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

  const sendMessage = (e) => {
    e.preventDefault()
    setMessageInput("")

    if (userId) {
      axios
        .post(
          `http://18.223.157.202/backend/api/admin/chat/send/${id}?user_id=${userId}&message=${messageInput}`
        )
        .then((res) => {
          console.log(res.data)
          setMessageInput("")
        })
    }
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/chat-support")}
          className="bg-blue-500 px-3 py-1 rounded text-white "
        >
          Back
        </button>
      </div>
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
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatWithUser
