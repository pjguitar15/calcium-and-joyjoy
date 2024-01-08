import React, { useState } from 'react';
import axiosInstance from '../../../Shared/utils/axiosInstance';
import { Button, FormControl, FormLabel, Input, Textarea, Grid, GridItem, Box, useToast, Icon, Tooltip } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe, FaTruck, FaBullseye, FaEye, FaUsers, FaHistory } from 'react-icons/fa';

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

    // Enhanced Form Field with Icon
    const FormFieldWithIcon = ({ icon, label, name, type = "text", isTextarea = false, ...props }) => (
        <FormControl>
            <FormLabel>
                <Icon as={icon} mr={2} />
                {label}
            </FormLabel>
            {isTextarea ? (
                <Textarea name={name} value={formData[name]} onChange={handleChange} {...props} />
            ) : (
                <Input type={type} name={name} value={formData[name]} onChange={handleChange} {...props} />
            )}
        </FormControl>
    );

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
                        <FormFieldWithIcon icon={FaGlobe} label="Logo URL" name="logo" />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormFieldWithIcon icon={FaTruck} label="Shipping Rate" name="shipping_rate" type="number" />
                    </GridItem>
                    
                    {/* Mission, Vision, and About Us Fields */}
                    <GridItem colSpan={2}>
                        <FormFieldWithIcon icon={FaBullseye} label="Mission" name="mission" isTextarea />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormFieldWithIcon icon={FaEye} label="Vision" name="vision" isTextarea />
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormFieldWithIcon icon={FaUsers} label="About Us" name="about_us" isTextarea />
                    </GridItem>

                    {/* History Text and Social Media URLs */}
                    <GridItem colSpan={2}>
                        <FormFieldWithIcon icon={FaHistory} label="History Text" name="history_text" isTextarea />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormFieldWithIcon icon={FaFacebook} label="Facebook URL" name="facebook" />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormFieldWithIcon icon={FaTwitter} label="Twitter URL" name="twitter" />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <FormFieldWithIcon icon={FaInstagram} label="Instagram URL" name="instagram" />
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