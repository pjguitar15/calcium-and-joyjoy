import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { FaPenClip } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

const Table = () => {
  const [allOrders, setAllOrders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({selected_id:'', name: '', role: '', permissions: '', track_number:'' ,url:'', estd:'' }); // For adding/editing
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10) 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const toast = useToast();

  useEffect(() => {
    axios.get("http://18.223.157.202/backend/api/admin/orders").then((res) => {
      setAllOrders(res.data);
    });
  }, []);

  const openModal = (item = {  selected_id:'',name: '', role: '', permissions: '' , track_number:'', url:'',estd:''}) => {
    setCurrentItem({ selected_id:'', name: '', role: '', permissions: '', track_number:'', url:'' ,estd:'' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem({selected_id:'', name: '', role: '', permissions: '', track_number:'', url:'' ,estd:'' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const markShipHandler = (id) => {
    console.log('hadukeen~',currentItem)
      if(currentItem.track_number  === '' && currentItem.url  === '' && currentItem.estd === '' ){
        toast({
          title: `Invalid!`,
          description: `Please complete all fields`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }else{
        let payload = {
          tracking_number:currentItem.track_number, 
          tracking_url:currentItem.url, 
          estimated_delivery_date: currentItem.estd
        }
        axios
      .post(`http://18.223.157.202/backend/api/admin/orders/${id}/tracking`,payload)
      .then((res) => {
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
          return item
        })
        setAllOrders(updatedOrders)
        toast({
          title: `Success!`,
          description: `Order successfully updated`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        closeModal()
      })
      })
      }


    // axios
    //   .post(`http://18.223.157.202/backend/api/admin/orders/${id}/status`, {
    //     status: "SHIPPED",
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     const updatedOrders = allOrders.map((item) => {
    //       if (item.id === id) {
    //         return { ...item, status: "SHIPPED" }
    //       }
    //       return item
    //     })
    //     setAllOrders(updatedOrders)
    //   })
  }

  const ActionButtons = ({ id, status }) => {
    const openModalAndSetCurrentItem = () => {
      openModal();

      setCurrentItem({ selected_id: id,  track_number:'', url:'' ,estd:'' });
      
    };
  
    return (
      <div className='flex'>
        {status !== "SHIPPED" && (
          <button
            onClick={openModalAndSetCurrentItem}
            className="border border-blue-700 hover:bg-blue-700 hover:text-white duration-300 text-blue-700 px-2 py-1 rounded mr-2 flex gap-1 items-center"
          >
            <FaPenClip />
            Mark as shipped
          </button>
        )}
  
       
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


    
    <div className="container mx-auto mt-2">
       <div className="container mx-auto mt-2">
      {/* ... your table code ... */}
      


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Tracking Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
              <FormLabel>Tracking Number</FormLabel>
              <Input placeholder="Enter Tracking Number" name="track_number" value={currentItem.track_number} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Tracking URL</FormLabel>
              <Input placeholder="Enter Tracking URL" name="url" value={currentItem.url} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Estimated Delivery Date</FormLabel>
              <Input type="datetime-local" placeholder="Enter estimated delivery" name="estd" value={currentItem.estd} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => markShipHandler(currentItem.selected_id)}> 
            Update Details
          </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
      <table className="rounded-lg min-w-full border border-separate  border-gray-400 bg-[#F3F3F3]">
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
