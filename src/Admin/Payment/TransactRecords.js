import React, { useState, useEffect } from 'react';
import axiosInstance from "../../Shared/utils/axiosInstance";
import { Box, useToast, Heading, Button } from "@chakra-ui/react"; // Import Button here
import OrdersTable from './TransactionRecords/OrdersTable';
import SearchBar from './TransactionRecords/SearchBar';

const Orders = () => {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();
    const [sortByDate, setSortByDate] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // Number of items per page

    useEffect(() => {
        fetchData();
    }, [sortByDate]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/admin/orders');
            setCurrentOrders(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updatePaymentStatus = async (id, newStatus) => {
        try {
            await axiosInstance.post(`/admin/orders/${id}/payment`, { payment_status: newStatus });
            toast({
                title: 'Payment Status Updated',
                description: `Order ${id} is now ${newStatus}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            fetchData(); // Refresh data immediately after updating
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };
    

    const toggleSortByDate = () => {
        setSortByDate(!sortByDate);
        setCurrentOrders([...currentOrders].reverse());
    };

    const filteredOrders = currentOrders.filter(order =>
        order.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedOrders = filteredOrders.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    return (
        <Box p="6">
            <Heading as="h3" size="lg" className="font-semibold">
                Payment Management | <span className="text-gray-500">Transaction Records</span>
            </Heading>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortByDate={sortByDate} toggleSortByDate={toggleSortByDate} />
            <OrdersTable data={paginatedOrders} updatePaymentStatus={updatePaymentStatus} />
            <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Previous</Button>
            <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={(currentPage + 1) * pageSize >= filteredOrders.length}>Next</Button>
        </Box>
    );
};

export default Orders;
