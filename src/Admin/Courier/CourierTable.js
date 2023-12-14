import React, { useState, useEffect } from 'react';
import { Flex, Heading, Box, Table, Thead, Tbody, Tr, Th, Td, Button, Switch, useToast } from '@chakra-ui/react';
import axiosInstance from '../../Shared/utils/axiosInstance';
import AddCourierForm from './forms/AddCourierForm';
import StatusChangeModal from './modals/StatusChangeModal';

const CourierTable = () => {
    const [couriers, setCouriers] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [courierToModify, setCourierToModify] = useState(null);
    const toast = useToast();

    useEffect(() => {
        fetchCouriers();
    }, []);

    const fetchCouriers = () => {
        axiosInstance.get('/admin/couriers')
            .then(response => {
                const updatedCouriers = response.data.map(courier => ({
                    ...courier,
                    active: courier.active === 'true'
                }));
                setCouriers(updatedCouriers);
            })
            .catch(error => {
                toast({
                    title: 'Error fetching couriers',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/admin/couriers/destroy/${id}`)
            .then(() => {
                fetchCouriers();
                toast({
                    title: 'Courier Deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Error deleting courier',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const toggleStatusModal = (courier) => {
        setCourierToModify(courier);
        setIsStatusModalOpen(true);
    };

    const confirmStatusChange = () => {
        if (!courierToModify) return;

        const newStatus = courierToModify.active ? 'false' : 'true';
        axiosInstance.post(`/admin/couriers/edit/${courierToModify.id}`, {
            courier_name: courierToModify.courier_name,
            active: newStatus
        })
            .then(() => {
                fetchCouriers(); // Refresh the list after status change
                toast({
                    title: 'Status Updated',
                    description: `Courier "${courierToModify.courier_name}" is now ${newStatus === 'true' ? 'active' : 'inactive'}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Error updating status',
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
                Order Management | <span className="text-gray-500">Courier Details</span>
            </Heading>

            <Box my={6}>
                <AddCourierForm refreshList={fetchCouriers} />
            </Box>

            <StatusChangeModal 
                isOpen={isStatusModalOpen} 
                onClose={() => setIsStatusModalOpen(false)}
                courier={courierToModify}
                onConfirm={confirmStatusChange}
            />

            <Flex direction="column" mt={4}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {couriers.map(courier => (
                            <Tr key={courier.id}>
                                <Td>{courier.courier_name}</Td>
                                <Td>
                                    <Switch isChecked={courier.active} onChange={() => toggleStatusModal(courier)} />
                                </Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => handleDelete(courier.id)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Flex>
        </Box>
    );
};

export default CourierTable;
