import React, { useState, useEffect, useCallback } from 'react';
import { Flex, Heading, Box, Table, Thead, Tbody, Tr, Th, Td, Button, Switch, useToast } from '@chakra-ui/react';
import axiosInstance from '../../Shared/utils/axiosInstance';
import AddPaymentMethodForm from './forms/AddPaymentMethodForm';
import PaymentStatusChangeModal from './modals/PaymentStatusChangeModal';

const PaymentOptionsTable = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [methodToModify, setMethodToModify] = useState(null);
    const toast = useToast();

    const fetchPaymentMethods = useCallback(() => {
        axiosInstance.get('/admin/payment-options')
            .then(response => {
                const updatedMethods = response.data.map(method => ({
                    ...method,
                    active: method.active === 'true' || method.active === 1
                }));
                setPaymentMethods(updatedMethods);
            })
            .catch(error => {
                toast({
                    title: 'Error fetching payment methods',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    }, [toast]);

    useEffect(() => {
        fetchPaymentMethods();
    }, [fetchPaymentMethods]);

    const handleDelete = (id) => {
        axiosInstance.delete(`/admin/payment-options/destroy/${id}`)
            .then(() => {
                fetchPaymentMethods();
                toast({
                    title: 'Payment Method Deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Error deleting payment method',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const toggleStatusModal = (method) => {
        setMethodToModify(method);
        setIsStatusModalOpen(true);
    };

    const confirmStatusChange = () => {
        if (!methodToModify) return;

        const newStatus = methodToModify.active ? 0 : 1; // Changed to 0 and 1
        axiosInstance.post(`/admin/payment-options/edit/${methodToModify.id}`, {
            name: methodToModify.name,
            account_number: methodToModify.account_number,
            account_name: methodToModify.account_name,
            payment_instructions: methodToModify.payment_instructions,
            active: newStatus
        })
            .then(() => {
                fetchPaymentMethods(); // Refresh the list after status change
                toast({
                    title: 'Payment Method Status Updated',
                    description: `Payment method "${methodToModify.name}" is now ${newStatus === 1 ? 'active' : 'inactive'}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Error updating payment method status',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });

        setIsStatusModalOpen(false);
    };

    return (
        <Box className="container mx-auto px-4 py-2">
            <Heading as="h3" size="lg" className="font-semibold">
                Payment Management | <span className="text-gray-500">Payment Method</span>
            </Heading>

            <Box my={6}>
                <AddPaymentMethodForm refreshList={fetchPaymentMethods} />
            </Box>

            <PaymentStatusChangeModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                paymentMethod={methodToModify}
                onConfirm={confirmStatusChange}
            />

            <Flex direction="column" mt={4}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Account Number</Th>
                            <Th>Account Name</Th>
                            <Th>Payment Instructions</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {paymentMethods.map(method => (
                            <Tr key={method.id}>
                                <Td>{method.name}</Td>
                                <Td>{method.account_number}</Td>
                                <Td>{method.account_name}</Td>
                                <Td>{method.payment_instructions}</Td>
                                <Td>
                                    <Switch isChecked={method.active} onChange={() => toggleStatusModal(method)} />
                                </Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => handleDelete(method.id)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Flex>
        </Box>
    );
};

export default PaymentOptionsTable;
