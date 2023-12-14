import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

const BasicInfo = () => {
    return (
        <Box p={4}>
            <Input placeholder="First Name" mb={4} />
            <Input placeholder="Last Name" mb={4} />
            <Input placeholder="Email" mb={4} />
            <Button colorScheme="teal">Save</Button>
        </Box>
    );
};

export default BasicInfo;
