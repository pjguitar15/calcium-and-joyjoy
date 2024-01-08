import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from "@chakra-ui/react";
import ActionButtons from './ActionButtons';
import ImageView from './ImageView';

const OrdersTable = ({ data, updatePaymentStatus }) => {
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const hoverBg = useColorModeValue('gray.50', 'gray.600');

    return (
        <Table variant="simple" size="md" colorScheme="teal">
            <Thead>
                <Tr bgColor={borderColor}>
                    <Th>Reference Number</Th>
                    <Th>User ID</Th>
                    <Th>Grand Total</Th>
                    <Th>Created At</Th>
                    <Th>Payment Status</Th>
                    <Th>Payment Method</Th>
                    <Th>Receipt Image</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item, index) => (
                    <Tr key={index} _hover={{ bgColor: hoverBg }}>
                        <Td>{item.reference_number}</Td>
                        <Td>{item.user_id}</Td>
                        <Td>P{item.grand_total}</Td>
                        <Td>{item.created_at.slice(0, 10)}</Td>
                        <Td className='uppercase'>{item.payment_status}</Td>
                        <Td>{item.payment_method}</Td>
                        <Td>
                            {item.receipt_img && (
                                <ImageView imageUrl={item.receipt_img} />
                            )}
                        </Td>
                        <Td>
                            <ActionButtons 
                                id={item.id} 
                                paymentStatus={item.payment_status} 
                                updatePaymentStatus={updatePaymentStatus} 
                            />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default OrdersTable;
