import React, { useState, useEffect } from 'react';
import axiosInstance from "../../Shared/utils/axiosInstance";
import { Box, useToast, Heading, Button, Flex, Spacer, Center, Stack } from "@chakra-ui/react";
import OrdersTable from './TransactionRecords/OrdersTable';
import SearchBar from './TransactionRecords/SearchBar';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();
    const [sortByDate, setSortByDate] = useState(true); // true for most recent first
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = orders.filter(order =>
            order.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const sorted = filtered.sort((a, b) => 
            sortByDate ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at)
        );
        setDisplayedOrders(sorted);
    }, [orders, searchTerm, sortByDate]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/admin/orders');
            setOrders(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))); // Sort by most recent first
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch orders.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
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
            toast({
                title: 'Error',
                description: `Failed to update payment status for order ${id}.`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    
    const toggleSortByDate = () => {
        setSortByDate(!sortByDate);
    };

    const totalPages = Math.ceil(displayedOrders.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedOrders = displayedOrders.slice(startIndex, startIndex + pageSize);

    return (
        <Box p="6">
            <Heading as="h3" size="lg" mb="4">
                Payment Management | <span style={{ color: "#718096" }}>Transaction Records</span>
            </Heading>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortByDate={sortByDate} toggleSortByDate={toggleSortByDate} />
            <OrdersTable data={paginatedOrders} updatePaymentStatus={updatePaymentStatus} />
            <Flex mt="4">
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                <Spacer />
                <Center>
                    <Stack direction="row" spacing={4}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                isActive={currentPage === i + 1}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </Stack>
                </Center>
                <Spacer />
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
            </Flex>
        </Box>
    );
};

export default Orders;
