import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import axiosInstance from '../../../Shared/utils/axiosInstance';

const AddCourierForm = ({ refreshList }) => {
    const [courierName, setCourierName] = useState('');
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.append('courier_name', courierName);
        params.append('active', 1); // Default to active when adding

        axiosInstance.post('/admin/couriers/create', params)
            .then(() => {
                refreshList();
                toast({
                    title: 'Courier Added',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setCourierName('');
            })
            .catch(error => {
                toast({
                    title: 'Error adding courier',
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
                <FormLabel>Courier Name</FormLabel>
                <Input value={courierName} onChange={e => setCourierName(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>Add Courier</Button>
        </Box>
    );
};

export default AddCourierForm;
