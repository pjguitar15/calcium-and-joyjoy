import React from "react"

const AdminChatSupport = () => {
  const ongoingChats = [
    {
      id: 1,
      customer: "Customer 1",
      lastMessage: "Hello there!",
      unreadCount: 2,
    },
    {
      id: 2,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },
    {
      id: 3,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },
    {
      id: 3,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },
    {
      id: 3,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },
    {
      id: 3,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },
    {
      id: 3,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },
    {
      id: 3,
      customer: "Customer 2",
      lastMessage: "How can I help you?",
      unreadCount: 0,
    },

    // Add more ongoing chats as needed
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-100 max-h-screen">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold">Ongoing Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {ongoingChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer transition"
          >
            <div>
              <h2 className="text-lg font-semibold">{chat.customer}</h2>
              <p className="text-gray-500">{chat.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                {chat.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminChatSupport
