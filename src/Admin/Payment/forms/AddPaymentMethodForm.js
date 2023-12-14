import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Switch, Textarea, useToast } from '@chakra-ui/react';
import axiosInstance from '../../../Shared/utils/axiosInstance';

const AddPaymentMethodForm = ({ refreshList }) => {
    const [name, setName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [paymentInstructions, setPaymentInstructions] = useState('');
    const [isActive, setIsActive] = useState(false); 
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('account_number', accountNumber);
        params.append('account_name', accountName);
        params.append('payment_instructions', paymentInstructions);
        params.append('active', isActive ? '1' : '0'); // Send '1' for true, '0' for false
    
        axiosInstance.post('/admin/payment-options/create', params)
            .then(() => {
                refreshList();
                toast({
                    title: 'Payment Method Added',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                // Clear form fields
                setName('');
                setAccountNumber('');
                setAccountName('');
                setPaymentInstructions('');
                setIsActive(false); // Set back to inactive
            })
            .catch(error => {
                toast({
                    title: 'Error adding payment method',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box as="form" onSubmit={handleSubmit} my={4}>
            <FormControl isRequired mb={3}>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Payment Method Name" />
            </FormControl>
            <FormControl isRequired mb={3}>
                <FormLabel>Account Number</FormLabel>
                <Input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="Account Number" />
            </FormControl>
            <FormControl isRequired mb={3}>
                <FormLabel>Account Name</FormLabel>
                <Input value={accountName} onChange={e => setAccountName(e.target.value)} placeholder="Account Name" />
            </FormControl>
            <FormControl isRequired mb={3}>
                <FormLabel>Payment Instructions</FormLabel>
                <Textarea value={paymentInstructions} onChange={e => setPaymentInstructions(e.target.value)} placeholder="Payment Instructions" />
            </FormControl>
            <FormControl display="flex" alignItems="center" mb={3}>
                <FormLabel mb="0">Active</FormLabel>
                <Switch isChecked={isActive} onChange={e => setIsActive(e.target.checked)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" isFullWidth>Add Payment Method</Button>
        </Box>
    );
};

export default AddPaymentMethodForm;
