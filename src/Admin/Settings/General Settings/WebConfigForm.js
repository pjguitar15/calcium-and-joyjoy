import React, { useState } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Button, FormControl, FormLabel, Input, Textarea, Grid, GridItem, Box, useToast } from '@chakra-ui/react';

const WebConfigForm = ({ initialData }) => {
    const [formData, setFormData] = useState({
        logo: initialData.logo || '',
        shipping_rate: initialData.shipping_rate || '',
        mission: initialData.mission || '',
        vision: initialData.vision || '',
        about_us: initialData.about_us || '',
        history_text: initialData.history_text || '',
        facebook: initialData.facebook || '',
        twitter: initialData.twitter || '',
        instagram: initialData.instagram || '',
    });

    const toast = useToast();

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('/admin/general-settings/update/settings', formData)
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
                    {/* Logo and Shipping Rate Fields */}
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Logo URL</FormLabel>
                            <Input type="text" name="logo" value={formData.logo} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Shipping Rate</FormLabel>
                            <Input type="number" name="shipping_rate" value={formData.shipping_rate} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    
                    {/* Mission, Vision, and About Us Fields */}
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>Mission</FormLabel>
                            <Textarea name="mission" value={formData.mission} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>Vision</FormLabel>
                            <Textarea name="vision" value={formData.vision} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>About Us</FormLabel>
                            <Textarea name="about_us" value={formData.about_us} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    {/* History Text and Social Media URLs */}
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>History Text</FormLabel>
                            <Textarea name="history_text" value={formData.history_text} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Facebook URL</FormLabel>
                            <Input type="text" name="facebook" value={formData.facebook} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Twitter URL</FormLabel>
                            <Input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>Instagram URL</FormLabel>
                            <Input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
                        </FormControl>
                    </GridItem>

                    {/* Submit Button */}
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
