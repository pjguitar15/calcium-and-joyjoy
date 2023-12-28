import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const ActionButtons = () => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex gap-4">
        {/* Child 1: "ADD ROLES" */}
        {/* <div className="bg-blue-500 text-white rounded py-2 px-4 cursor-pointer text-xs font-semibold flex items-center">
          ADD ROLES
        </div> */}

        {/* Child 2: "Sort" dropdown */}
        <div className="relative">
          <select className="bg-lightgray border border-darkgray rounded py-2 px-4 focus:outline-none text-sm font-semibold flex items-center">
            <option>Sort</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Child 3: Delete button */}
        <div className="bg-lightgray border border-darkgray rounded py-2 px-4 cursor-pointer flex items-center">
          <FaTrashAlt className='text-sm' />
        </div>
      </div>

      {/* Child 4: Search input field */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-lightgray border border-darkgray rounded py-2 px-4 focus:outline-none"
      />
    </div>
  )
}

export default ActionButtons