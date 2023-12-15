import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Box } from "@chakra-ui/react";

function MultipleImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const uploadImages = async () => {
    setUploading(true);
    const uploadPromises = selectedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "zwzmglhl"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dbibwzs6c/image/upload",
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const urls = await Promise.all(uploadPromises);
    setImageUrls(urls.filter(url => url != null));
    setUploading(false);
  };

  return (
    <Box>
      <Input type="file" multiple onChange={handleFileSelect} />
      <Button onClick={uploadImages} isLoading={uploading}>
        Upload Images
      </Button>
      {imageUrls.map((url, index) => (
        <Box key={index} as="img" src={url} alt={`Uploaded Image ${index}`} />
      ))}
    </Box>
  );
}

export default MultipleImageUpload;
