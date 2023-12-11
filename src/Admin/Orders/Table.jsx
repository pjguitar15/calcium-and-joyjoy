import React, { useEffect, useState } from "react"
import { fakeTableData } from "../Users/Roles/fakeTableData"
import axios from "axios"
import { FaPenClip } from "react-icons/fa6"
import { FaTrashAlt } from "react-icons/fa"
export const ActionButtons = () => {
  return (
    <div>
      <button className="bg-blue-700 text-white px-2 py-2 rounded mr-2">
        <FaPenClip className="text-sm" />
      </button>
      <button className="bg-red-500 text-white px-2 py-2 rounded mr-2">
        <FaTrashAlt className="text-sm" />
      </button>
    </div>
  )
}

const Table = () => {
  const [allOrders, setAllOrders] = useState([])
  const bearerToken = localStorage.getItem("adminLoginToken")
  useEffect(() => {
    axios
      .get("http://18.223.157.202/backend/api/user/orders", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json", // Include this header if needed
        },
      })
      .then((res) => {
        setAllOrders(res.data.data)
      })
  }, [])

  return (
    <div className="container mx-auto mt-2">
      <table className="rounded-lg min-w-full border border-separate  border-gray-400 bg-[#F3F3F3]">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-gray-400 text-start">
              Order number
            </th>
            <th className="px-4 border-b border-gray-400 text-start">
              Customer
            </th>
            <th className="px-4 border-b border-gray-400 text-start">
              Total Amount
            </th>
            <th className="px-4 border-b border-gray-400 text-start">
              Order Date
            </th>
            <th className="px-4 border-b border-gray-400 text-start">
              Order Status
            </th>
            <th className="px-4 border-b border-gray-400 text-start">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* reference_number, user_id, grand_total, created_at, status */}
          {allOrders.map((item, index) => (
            <tr>
              <td className="py-3 px-4 last:border-b-0 border-b border-gray-400">
                {item.reference_number}
              </td>
              <td className="px-4 border-b border-gray-400">{item.user_id}</td>
              <td className="px-4 border-b border-gray-400">
                P{item.grand_total}
              </td>
              <td className="px-4 border-b border-gray-400">
                {item.created_at.slice(0, 10)}
              </td>
              <td className="uppercase px-4 border-b border-gray-400">
                {item.status}
              </td>
              <td className="px-4 border-b border-gray-400">
                <ActionButtons />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
