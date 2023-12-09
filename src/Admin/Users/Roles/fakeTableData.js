import { FaPenClip } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const actionButtons = () => {
  return <div>
    <button className="bg-blue-700 text-white px-2 py-2 rounded mr-2">
      <FaPenClip className='text-sm' />
    </button>
    <button className="bg-red-500 text-white px-2 py-2 rounded mr-2">
      <FaTrashAlt className='text-sm' />
    </button>
  </div>
}

export const fakeTableData = [
  {
    roles: "Administrator",
    permissions: "All Permissions",
    date: "22/10/2023",
    actions: actionButtons(),
  },
  {
    roles: "User",
    permissions: "Limited Access",
    date: "23/10/2023",
    actions: actionButtons(),
  },
  // Add 8 more entries with similar structure...
  {
    roles: "Editor",
    permissions: "Read-Only",
    date: "24/10/2023",
    actions: actionButtons(),
  },
  {
    roles: "Guest",
    permissions: "View Only",
    date: "25/10/2023",
    actions: actionButtons(),
  },

];
