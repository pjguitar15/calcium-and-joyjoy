import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, NumberInput, NumberInputField, useToast } from '@chakra-ui/react';
import axiosInstance from '../../../Shared/utils/axiosInstance';

const AddDiscountCouponForm = ({ refreshList }) => {
    const [couponName, setCouponName] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [dateLimit, setDateLimit] = useState(new Date().toISOString().split('T')[0]); // Default to current date
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation for date limit
        const selectedDate = new Date(dateLimit);
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            toast({
                title: 'Invalid Date',
                description: 'The date limit must not be in the past.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return; // Prevent form submission
        }

        const params = new URLSearchParams();
        params.append('name', couponName);
        params.append('discount_code', discountCode);
        params.append('total_amount', totalAmount);
        params.append('date_limit', dateLimit);
        params.append('is_active', 1);

        axiosInstance.post('/admin/discount_coupons/create', params)
            .then(() => {
                refreshList();
                toast({
                    title: 'Discount Coupon Added',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setCouponName('');
                setDiscountCode('');
                setTotalAmount('');
                setDateLimit(new Date().toISOString().split('T')[0]); // Reset to current date
            })
            .catch(error => {
                toast({
                    title: 'Error adding discount coupon',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box as="form" onSubmit={handleSubmit} my={4}>
            <FormControl isRequired>
                <FormLabel>Coupon Name</FormLabel>
                <Input value={couponName} onChange={e => setCouponName(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>Discount Code</FormLabel>
                <Input value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>Total Amount</FormLabel>
                <NumberInput min={0}>
                    <NumberInputField value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
                </NumberInput>
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>Date Limit (YYYY-MM-DD)</FormLabel>
                <Input 
                    type="date" 
                    value={dateLimit} 
                    onChange={e => setDateLimit(e.target.value)} 
                />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>Add Discount Coupon</Button>
        </Box>
    );
};

export default AddDiscountCouponForm;
