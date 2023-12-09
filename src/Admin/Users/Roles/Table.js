import React from "react"
import { fakeTableData } from "./fakeTableData"

const Table = () => {
  return (
    <div className="container mx-auto mt-2">
      <table className="rounded-lg min-w-full border border-separate  border-gray-400 bg-[#F3F3F3]">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-gray-400 text-start">
              Roles
            </th>
            <th className="px-4 border-b border-gray-400 text-start">
              Permissions
            </th>
            <th className="px-4 border-b border-gray-400 text-start">Date</th>
            <th className="px-4 border-b border-gray-400 text-start">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {fakeTableData.map((item, index) => (
            <tr>
              <td className="py-3 px-4 last:border-b-0 border-b border-gray-400">
                {item.roles}
              </td>
              <td className="px-4 border-b border-gray-400">
                {item.permissions}
              </td>
              <td className="px-4 border-b border-gray-400">{item.date}</td>
              <td className="px-4 border-b border-gray-400">{item.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
