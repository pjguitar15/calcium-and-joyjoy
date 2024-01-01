import React, { useState } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Button, FormControl, FormLabel, Input, Grid, GridItem, Box, useToast } from '@chakra-ui/react';

const WebConfigForm = ({ initialData }) => {
    const [formData, setFormData] = useState({
        logo: initialData.logo || '',
        favicon: initialData.favicon || '',
        header_title: initialData.header_title || '',
        footer_text: initialData.footer_text || '',
        contact_info: initialData.contact_info || '',
        social_media: initialData.social_media || '',
        shipping_rate: initialData.shipping_rate || '',
    });

    const toast = useToast();


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('/admin/general-settings/update/web-config', formData)
            .then(response => {
                toast({
                    title: "Settings updated",
                    description: "Your web configuration settings have been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch(error => {
                console.error('Error updating settings', error);
                toast({
                    title: "Error",
                    description: "There was an error updating your web configuration settings.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box p={4} w="100%">
            <form onSubmit={handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Logo URL</FormLabel>
                            <Input type="text" name="logo" value={formData.logo} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Favicon URL</FormLabel>
                            <Input type="text" name="favicon" value={formData.favicon} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Header Title</FormLabel>
                            <Input type="text" name="header_title" value={formData.header_title} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Footer Text</FormLabel>
                            <Input type="text" name="footer_text" value={formData.footer_text} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Contact Info</FormLabel>
                            <Input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Social Media URLs</FormLabel>
                            <Input type="text" name="social_media" value={formData.social_media} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>Shipping Rate</FormLabel>
                            <Input type="number" name="shipping_rate" value={formData.shipping_rate} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Button 
                            type="submit"
                            bgColor='gray'
                            _hover={{ bgColor: "var(--accent)" }}
                            color='white' 
                            borderRadius='20px' 
                            w="full"
                        >
                            Update Web Config
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Box>
    );
};

export default WebConfigForm;
