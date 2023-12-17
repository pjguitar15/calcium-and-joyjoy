import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderDetailItem from "./OrderDetailItem";

function OrderDetails() {
    const [currUserOrders, setCurrUserOrders] = useState([]);
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    useEffect(() => {
        axios
            .get(`http://18.223.157.202/backend/api/user/orders`, {
                headers: {
                    Authorization: `Bearer ${parsedUser?.token}`,
                },
            })
            .then((res) => {
                // Filter out orders with status 'RECEIVED' right after fetching
                const filteredData = res.data.data?.filter(
                    (item) => item.items.length > 0 && item.status !== 'RECEIVED'
                );
                setCurrUserOrders(filteredData);
            });
    }, []);

    const handleMarkAsReceived = (order) => {
        axios
            .post(`http://18.223.157.202/backend/api/admin/orders/${order.id}/status`, {
                status: 'RECEIVED',
            }, {
                headers: {
                    Authorization: `Bearer ${parsedUser?.token}`,
                },
            })
            .then(response => {
                // Remove the order from the state after marking it as received
                const remainingOrders = currUserOrders.filter(item => item.id !== order.id);
                setCurrUserOrders(remainingOrders);
            })
            .catch(error => {
                console.error("Error updating order status:", error);
            });
    };

    return (
        <main className='py-8 pe-8 overflow-y-scroll max-h-[800px] flex flex-col gap-3'>
            {currUserOrders?.map((item, index) => (
                <OrderDetailItem 
                    key={index} 
                    orderItems={item} 
                    onReceived={() => handleMarkAsReceived(item)} 
                />
            ))}
        </main>
    );
}

export default OrderDetails;
