import React, { useState } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Button, FormControl, FormLabel, Input, Textarea, Grid, GridItem, Box } from '@chakra-ui/react';

const BasicInfoForm = ({ initialData }) => {
    const [formData, setFormData] = useState({
        about_us_image: initialData.about_us_image || '',
        history_image: initialData.history_image || '',
        about_us_text: initialData.about_us_text || '',
        history_text: initialData.history_text || '',
        privacy_policy: initialData.privacy_policy || '',
        terms_and_condition: initialData.terms_and_condition || '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('/admin/general-settings/update/basic-info', formData)
            .then(response => {
                alert('Settings updated successfully');
            })
            .catch(error => {
                console.error('Error updating settings', error);
            });
    };

    return (
        <Box p={4} w="100%">
            <form onSubmit={handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>About Us Image URL</FormLabel>
                            <Input type="text" name="about_us_image" value={formData.about_us_image} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel>History Image URL</FormLabel>
                            <Input type="text" name="history_image" value={formData.history_image} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>About Us Text</FormLabel>
                            <Textarea name="about_us_text" value={formData.about_us_text} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>History Text</FormLabel>
                            <Textarea name="history_text" value={formData.history_text} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>Privacy Policy</FormLabel>
                            <Textarea name="privacy_policy" value={formData.privacy_policy} onChange={handleChange} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>Terms and Conditions</FormLabel>
                            <Textarea name="terms_and_condition" value={formData.terms_and_condition} onChange={handleChange} />
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
                            Update Basic Info
                        </Button>
                    </GridItem>
                </Grid>
            </form>
        </Box>
    );
};

export default BasicInfoForm;
