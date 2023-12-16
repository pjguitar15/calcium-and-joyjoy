import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPenClip } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Table = () => {
  const [allOrders, setAllOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Adjust this value based on your pagination preference
  useEffect(() => {
    axios.get("http://18.223.157.202/backend/api/admin/orders").then((res) => {
      setAllOrders(res.data);
    });
  }, []);

  const markShipHandler = (id) => {
    console.log(id);
    axios
      .post(`http://18.223.157.202/backend/api/admin/orders/${id}/status`, {
        status: "SHIPPED",
      })
      .then((res) => {
        console.log(res);
        const updatedOrders = allOrders.map((item) => {
          if (item.id === id) {
            return { ...item, status: "SHIPPED" };
          }
          return item;
        });
        setAllOrders(updatedOrders);
      });
  };

  const handleMarkReceived = async (id) => {
    console.log(id);
    axios
      .post(`http://18.223.157.202/backend/api/admin/orders/${id}/status`, {
        status: "RECEIVED",
      })
      .then((res) => {
        console.log(res);
        const updatedOrders = allOrders.map((item) => {
          if (item.id === id) {
            return { ...item, status: "RECEIVED" };
          }
          return item;
        });
        setAllOrders(updatedOrders);
      });
  };

  const ActionButtons = ({ id, status }) => {
    return (
      <div className='flex'>
        {status !== "SHIPPED" && (
          <button
            onClick={() => markShipHandler(id)}
            className='border border-blue-700 hover:bg-blue-700 hover:text-white duration-300 text-blue-700 px-2 py-1 rounded mr-2 flex gap-1 items-center'
          >
            <FaPenClip />
            Mark as shipped
          </button>
        )}
        {status === "SHIPPED" && (
          <button
            onClick={() => handleMarkReceived(id)}
            className='border border-blue-700 hover:bg-blue-700 hover:text-white duration-300 text-blue-700 px-2 py-1 rounded mr-2 flex gap-1 items-center'
          >
            <FaPenClip />
            Mark as received
          </button>
        )}

        <button className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 px-2 py-2 rounded mr-2 flex-1 flex justify-center'>
          <FaTrashAlt className='text-sm' />
        </button>
      </div>
    );
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container mx-auto mt-2'>
      <table className='rounded-lg min-w-full border border-separate  border-gray-400 bg-[#F3F3F3]'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b border-gray-400 text-start'>
              Order number
            </th>
            <th className='px-4 border-b border-gray-400 text-start'>
              Customer
            </th>
            <th className='px-4 border-b border-gray-400 text-start'>
              Total Amount
            </th>
            <th className='px-4 border-b border-gray-400 text-start'>
              Order Date
            </th>
            <th className='px-4 border-b border-gray-400 text-start'>
              Order Status
            </th>
            <th className='px-4 border-b border-gray-400 text-start'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* reference_number, user_id, grand_total, created_at, status */}
          {currentOrders.map((item, index) => (
            <tr>
              <td className='py-3 px-4 last:border-b-0 border-b border-gray-400'>
                {item.reference_number}
              </td>
              <td className='px-4 border-b border-gray-400'>{item.user_id}</td>
              <td className='px-4 border-b border-gray-400'>
                P{item.grand_total}
              </td>
              <td className='px-4 border-b border-gray-400'>
                {item.created_at.slice(0, 10)}
              </td>
              <td className='uppercase px-4 border-b border-gray-400'>
                {item.status}
              </td>
              <td className='px-4 border-b border-gray-400'>
                <ActionButtons id={item.id} status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className='flex justify-center mt-4'>
        {Array.from({
          length: Math.ceil(allOrders.length / ordersPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-4 py-2 rounded focus:outline-none ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
