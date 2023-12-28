import React, { useEffect, useState, useCallback, useMemo } from "react";
import axiosInstance from "../../Shared/utils/axiosInstance";
import OrderDetailItem from "./OrderDetailItem";
import { Box, Heading, Text, CircularProgress, Center } from "@chakra-ui/react";

function OrderDetails() {
    const [currUserOrders, setCurrUserOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchOrders = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/user/orders", {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            return response.data.data?.filter(
                (item) => item.items.length > 0 && item.status !== 'RECEIVED'
            );
        } catch (err) {
            setError('Error fetching orders. Please try again later.');
            console.error("Error fetching orders:", err);
        }
    }, [user?.token]);

    useEffect(() => {
        fetchOrders().then(filteredData => {
            if (filteredData) {
                setCurrUserOrders(filteredData);
            }
            setIsLoading(false);
        });
    }, [fetchOrders]);

    const handleMarkAsReceived = useCallback((order) => {
        axiosInstance.post(`/admin/orders/${order.id}/status`, {
            status: 'RECEIVED',
        }, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
        .then(response => {
            const remainingOrders = currUserOrders.filter(item => item.id !== order.id);
            setCurrUserOrders(remainingOrders);
        })
        .catch(error => {
            console.error("Error updating order status:", error);
        });
    }, [currUserOrders, user?.token]);

    const renderedOrders = useMemo(() => currUserOrders.map((item, index) => (
        <OrderDetailItem 
            key={index} 
            orderItems={item} 
            onReceived={() => handleMarkAsReceived(item)} 
        />
    )), [currUserOrders, handleMarkAsReceived]);

    return (
        <main className='py-8 pe-8 overflow-y-scroll max-h-[800px] flex flex-col gap-3'>
            <Heading as="h3" size="lg" mb="6">My Orders</Heading>
            {isLoading ? (
                <Center><CircularProgress isIndeterminate color="green.300" /></Center>
            ) : error ? (
                <Text color="red.500">{error}</Text>
            ) : currUserOrders?.length > 0 ? (
                renderedOrders
            ) : (
                <Text>No orders to display. Start shopping now!</Text>
            )}
        </main>
    );
}

export default OrderDetails;
