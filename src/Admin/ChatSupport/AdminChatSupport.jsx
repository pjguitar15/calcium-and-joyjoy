import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AdminChatSupport = () => {
  const [chatList, setChatList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/chat/list`)
      .then((res) => {
        const getLastMessage = (arr) => {
          let lastMessage = ""

          if (arr.length === 1) {
            lastMessage = arr[0].message
          }

          if (arr.length > 2) {
            lastMessage = arr[arr.length - 1].message
          }

          return lastMessage
        }

        const mappedRes = res.data.map((item) => {
          console.log(item.data)
          const resObject = {
            id: item.id,
            customer: item.author.name,
            lastMessage: getLastMessage(item.messages),
          }
          return resObject
        })
        setChatList(mappedRes)
      })
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-h-screen">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold">Ongoing Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {chatList.reverse().map((chat) => (
          <div
            onClick={() => {
              navigate(`/admin/chat-support/chat/${chat.id}`)
            }}
            key={chat.id}
            className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
          >
            <div>
              <h2 className="text-lg font-semibold">{chat.customer}</h2>
              <p className="text-gray-500">
                {chat.lastMessage === "" ? "No messages yet" : chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminChatSupport
