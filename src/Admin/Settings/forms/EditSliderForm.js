import React, { useState } from 'react';
import {
  Button, FormControl, FormLabel, Image, IconButton, useToast, Center, Text, VStack, Flex, Input
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';


function EditSliderForm({ slider, onSave, onCancel }) {
  const [startDate, setStartDate] = useState(slider.start_date);
  const [endDate, setEndDate] = useState(slider.end_date);
  const [imagePreview, setImagePreview] = useState(slider.image_url);
  const [imageFile, setImageFile] = useState(null);
  const toast = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImageFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  });

  const clearImage = () => {
    setImagePreview('');
    setImageFile(null);
  };

  const handleSave = () => {
    if (!imageFile && !imagePreview) {
      toast({ title: "Please upload an image", status: "error" });
      return;
    }
    onSave({
      ...slider,
      image: imageFile, // Pass the new image file if it exists
      start_date: startDate,
      end_date: endDate
    });
  };

  return (
     <VStack spacing={4} align="stretch">
      <Center {...getRootProps()} p={6} border="2px dashed gray" borderRadius="md" bg="white" cursor="pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text>Drop the image here...</Text>
        ) : (
          <Text>Drag 'n' drop an image here, or click to select an image</Text>
        )}
      </Center>
      {imagePreview && (
        <Flex position="relative" justifyContent="center" alignItems="center" mt={3}>
          <Image src={imagePreview} alt="Preview" boxSize="200px" objectFit="cover" borderRadius="md" />
          <IconButton
            icon={<CloseIcon />}
            colorScheme="red"
            aria-label="Close Preview"
            position="absolute"
            top={0}
            right={0}
            size="sm"
            onClick={clearImage}
          />
        </Flex>
      )}
      <FormControl>
        <FormLabel>Start Date</FormLabel>
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>End Date</FormLabel>
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </FormControl>
      <Flex justify="space-between">
        <Button colorScheme="blue" onClick={handleSave}>Save Changes</Button>
        <Button colorScheme="gray" onClick={onCancel}>Cancel</Button>
      </Flex>
    </VStack>
  );
}

export default EditSliderForm;
