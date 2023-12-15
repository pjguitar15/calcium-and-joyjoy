import React, { useState, useEffect } from 'react';
import {
  Box, Button, Input, FormControl, FormLabel, useToast, VStack, HStack, Image, Text,
  Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, IconButton, AspectRatio, SimpleGrid, Heading, Flex
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import axiosInstance from '../../Shared/utils/axiosInstance';
import { useDropzone } from 'react-dropzone';
import EditSliderForm from './forms/EditSliderForm';

function Announcement() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const currentDate = new Date();
  const currentDateTimeInPH = new Date(currentDate.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const [startDate, setStartDate] = useState(currentDateTimeInPH.toISOString().split('T')[0]); // Default to today's date in PH time
  const [endDate, setEndDate] = useState('');
  const [sliderImages, setSliderImages] = useState([]);
  const [editingSlider, setEditingSlider] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();
  const [previewImage, setPreviewImage] = useState('');
  const toast = useToast();

  const clearImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const fetchSliders = () => {
    axiosInstance.get('/admin/home_slider')
      .then(response => setSliderImages(response.data))
      .catch(error => console.error("Error fetching sliders: ", error));
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImage(acceptedFiles[0]);
    }
  });

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zwzmglhl"); // Replace with your preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbibwzs6c/image/upload",
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  }

  const validateDates = () => {
    if (new Date(startDate) < new Date()) {
      toast({ title: "Start date is in the past", status: "error" });
      return false;
    }
    return true;
  };

  async function createSlider() {
    if (!validateDates()) return;
    const imageUrl = await uploadImage(image);
    if (!imageUrl) {
      toast({ title: "Failed to upload image", status: "error" });
      return;
    }


    axiosInstance.post('/admin/home_slider/create', {
      image_url: imageUrl,
      start_date: startDate,
      end_date: endDate
    })
    .then(() => {
      toast({ title: "Slider created successfully", status: "success" });
      fetchSliders();
      clearImage(); // Clear image after creation
    })
    .catch(error => {
      console.error("Error creating slider: ", error);
      toast({ title: "Error creating slider", status: "error" });
    });
  }

  async function handleDelete(id) {
    axiosInstance.delete(`/admin/home_slider/destroy/${id}`)
      .then(() => {
        toast({ title: "Slider deleted successfully", status: "success" });
        setSliderImages(sliderImages.filter(slider => slider.id !== id));
      })
      .catch(error => {
        console.error("Error deleting slider: ", error);
        toast({ title: "Error deleting slider", status: "error" });
      });
  }

  async function handleEdit() {
    const imageUrl = image ? await uploadImage(image) : editingSlider.image_url;

    axiosInstance.post(`/admin/home_slider/edit/${editingSlider.id}`, {
      image_url: imageUrl,
      start_date: startDate,
      end_date: endDate
    })
    .then(() => {
      toast({ title: "Slider updated successfully", status: "success" });
      onClose();
      fetchSliders();
    })
    .catch(error => {
      console.error("Error updating slider: ", error);
      toast({ title: "Error updating slider", status: "error" });
    });
  }

  const handleEditSave = async (editedSlider) => {
    // If a new image is uploaded, upload it and get the URL, otherwise use the existing URL
    const imageUrl = image ? await uploadImage(image) : editedSlider.image_url;
  
    axiosInstance.post(`/admin/home_slider/edit/${editedSlider.id}`, {
      image_url: imageUrl,
      start_date: editedSlider.start_date,
      end_date: editedSlider.end_date
    })
    .then(() => {
      toast({ title: "Slider updated successfully", status: "success" });
      onClose(); // Close the modal
      fetchSliders(); // Refresh the sliders list
      clearImage(); // Clear the image preview if a new image was uploaded
    })
    .catch(error => {
      console.error("Error updating slider: ", error);
      toast({ title: "Error updating slider", status: "error" });
    });
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview('');
  };
  
  

  function openEditModal(slider) {
    setEditingSlider(slider);
    setStartDate(slider.start_date);
    setEndDate(slider.end_date);
    setImagePreview(slider.image_url);
    onOpen();
  }

  const handleSliderClick = (imageUrl) => {
    setPreviewImage(imageUrl);
    onPreviewOpen();
  };

  return (
    <Box p={4}>
      <Heading as="h3" size="lg" mb={5}>
        General Settings | <span style={{ color: 'gray' }}>Announcement</span>
      </Heading>

      <VStack spacing={4}>
      <Center {...getRootProps()} p={6} border="2px dashed gray" borderRadius="md" bg="white" cursor="pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the image here...</Text>
        ) : (
          <Text>Drag 'n' drop an image here, or click to select an image</Text>
        )}
      </Center>
      {imagePreview && (
        <Box mt={3} position="relative">
          <Image src={imagePreview} alt="Preview" boxSize="200px" objectFit="cover" borderRadius="md" />
          <IconButton
            icon={<CloseIcon />}
            colorScheme="red"
            aria-label="Close Preview"
            position="absolute"
            top={1}
            right={1}
            size="sm"
            onClick={clearImage}
          />
        </Box>
      )}
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={createSlider}>Create Slider</Button>
      </VStack>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={5}>
        {sliderImages.map(slider => (
          <Flex key={slider.id} border="1px solid black" p={3} borderRadius="md" direction="column">
            <Box height="200px" overflow="hidden">
              <Image src={slider.image_url} alt="Slider Image" width="100%" height="100%" objectFit="cover" onClick={() => handleSliderClick(slider.image_url)} />
            </Box>
            <Box p={2}>
              <Text fontSize="sm">Start Date: {slider.start_date}</Text>
              <Text fontSize="sm">End Date: {slider.end_date}</Text>
            </Box>
            <HStack spacing={2} justifyContent="flex-end" mt={2}>
              <Button size="sm" colorScheme="yellow" onClick={() => openEditModal(slider)}>Edit</Button>
              <Button size="sm" colorScheme="red" onClick={() => handleDelete(slider.id)}>Delete</Button>
            </HStack>
          </Flex>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Slider</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditSliderForm
            slider={editingSlider}
            onSave={handleEditSave}
            onCancel={onClose}
            onImageRemove={handleImageRemove}
          />
        </ModalBody>
      </ModalContent>
    </Modal>

      <Modal isOpen={isPreviewOpen} onClose={onPreviewClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image src={previewImage} alt="Preview" boxSize="100%" objectFit="contain" />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onPreviewClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </Box>
  );
}

export default Announcement;
