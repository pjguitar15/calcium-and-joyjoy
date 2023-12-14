import React, { useState, useEffect } from 'react';
import { Flex, Heading, Box, Table, Thead, Tbody, Tr, Th, Td, Button, Switch, useToast } from '@chakra-ui/react';
import axiosInstance from '../../Shared/utils/axiosInstance';
import AddDiscountCouponForm from './forms/AddDiscountCouponForm'; // Adjust or create this form
import StatusChangeModal from './modals/StatusChangeModal'; // Adjust or reuse this modal

const DiscountCouponsTable = () => {
    const [discountCoupons, setDiscountCoupons] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [couponToModify, setCouponToModify] = useState(null);
    const toast = useToast();

    useEffect(() => {
        fetchDiscountCoupons();
    }, []);

    const fetchDiscountCoupons = () => {
        axiosInstance.get('/admin/discount_coupons')
            .then(response => {
                const updatedCoupons = response.data.map(coupon => ({
                    ...coupon,
                    isActive: coupon.is_active === 1
                }));
                setDiscountCoupons(updatedCoupons);
            })
            .catch(error => {
                toast({
                    title: 'Error fetching coupons',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/admin/discount_coupons/destroy/${id}`)
            .then(() => {
                fetchDiscountCoupons();
                toast({
                    title: 'Discount Coupon Deleted',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                toast({
                    title: 'Error deleting discount coupon',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const toggleStatusModal = (coupon) => {
        setCouponToModify(coupon);
        setIsStatusModalOpen(true);
    };

    const confirmStatusChange = () => {
        if (!couponToModify) return;

        const newStatus = couponToModify.isActive ? 0 : 1;
        axiosInstance.post(`/admin/discount_coupons/edit/${couponToModify.id}`, {
            name: couponToModify.name,
            discount_code: couponToModify.discount_code,
            total_amount: couponToModify.total_amount,
            is_active: newStatus
        })
            .then(() => {
                fetchDiscountCoupons();
                toast({
                    title: 'Status Updated',
                    description: `Discount Coupon "${couponToModify.name}" is now ${newStatus === 1 ? 'active' : 'inactive'}`,
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
                Order Management | <span className="text-gray-500">Discounts</span>
            </Heading>

            <Box my={6}>
                <AddDiscountCouponForm refreshList={fetchDiscountCoupons} />
            </Box>

            <StatusChangeModal 
                isOpen={isStatusModalOpen} 
                onClose={() => setIsStatusModalOpen(false)}
                coupon={couponToModify}
                onConfirm={confirmStatusChange}
            />

            <Flex direction="column" mt={4}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Discount Code</Th>
                            <Th>Total Amount</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {discountCoupons.map(coupon => (
                            <Tr key={coupon.id}>
                                <Td>{coupon.name}</Td>
                                <Td>{coupon.discount_code}</Td>
                                <Td>{coupon.total_amount}</Td>
                                <Td>
                                    <Switch isChecked={coupon.isActive} onChange={() => toggleStatusModal(coupon)} />
                                </Td>
                                <Td>
                                    <Button colorScheme="red" onClick={() => handleDelete(coupon.id)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Flex>
        </Box>
    );
};

export default DiscountCouponsTable;
