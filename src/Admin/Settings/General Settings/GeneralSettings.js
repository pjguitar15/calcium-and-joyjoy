import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import WebConfigForm from './WebConfigForm';
import { Box, Heading, Spinner, VStack } from '@chakra-ui/react';

const GeneralSettings = () => {
    const [settings, setSettings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/admin/general-settings')
            .then(response => {
                setSettings(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching settings', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Box p={4} w="100%">
            <Heading mb={6}>General Settings</Heading>
            <VStack spacing={8} align="stretch">
                {settings && (
                    <>
                        <Box 
                            p={5} 
                            shadow="sm" 
                            borderWidth="1px" 
                            borderColor="black"
                            borderRadius="md" 
                            bg="white" 
                            w="100%"
                        >
                            <Heading size="lg" mb={4}>Website Config</Heading>
                            <WebConfigForm initialData={settings} />
                        </Box>
                    </>
                )}
            </VStack>
        </Box>
    );
};

export default GeneralSettings;
