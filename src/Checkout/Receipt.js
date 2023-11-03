import { CloseIcon } from "@chakra-ui/icons";
import { Box, FormControl, Image, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";

function Receipt({ onUpload }) {
  const toast = useToast();
  const [imageSrc, setImageSrc] = useState(null);
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      onUpload(file);
    } else {
      setImageSrc(null);
      toast({
        description: "Please upload a JPG, JPEG, or PNG image.",
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <>
      <FormControl pos='relative' mt='24px'>
        <Input
          type='file'
          variant='unstyled'
          // display='none'
          pos='absolute'
          opacity={0}
          multiple={false}
          onChange={handleChange}
          _focus={{ outline: "none" }}
          zIndex={2}
          bgColor='red'
          cursor='pointer'
          h='100%'
        />

        <Box textAlign='center'>
          <label htmlFor='file-input'>
            <Box
              cursor='pointer'
              as='span'
              display='block'
              p='2'
              borderWidth='1px'
              borderRadius='md'
              _hover={{ bg: "gray.100" }}
              opacity={0.8}
              fontWeight='semibold'
            >
              + Drop receipt here
            </Box>
          </label>
        </Box>
      </FormControl>
      <Box pos='relative'>
        {imageSrc && (
          <CloseIcon
            fontSize='18px'
            color='red'
            pos='absolute'
            top='8px'
            right='0px'
            cursor='pointer'
            onClick={() => setImageSrc("")}
          />
        )}
        <Image mx='auto' src={imageSrc} />
      </Box>
    </>
  );
}

export default Receipt;
