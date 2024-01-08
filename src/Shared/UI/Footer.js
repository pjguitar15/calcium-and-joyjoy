import React, { useState, useEffect } from 'react';
import { Box, Icon, Text, VStack, Flex } from "@chakra-ui/react";
import { BiLogoTwitter, BiLogoFacebook } from "react-icons/bi";
import { FaInstagram, FaLocationArrow } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";  // Adjust the path as necessary

function Footer() {
  const [historyText, setHistoryText] = useState('Loading history...');
  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    twitter: "",
    instagram: ""
  });

  useEffect(() => {
    axiosInstance.get('/admin/general-settings')
      .then(response => {
        const data = response.data;
        setHistoryText(data.history_text);
        setSocialMedia({
          facebook: data.facebook,
          twitter: data.twitter,
          instagram: data.instagram
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setHistoryText("Error loading history. Please try again later.");
      });
  }, []);

  return (
    <Box bgColor='#403F3F' py='40px' px='40px' color='#FFDC83'>
      <VStack
        maxW='var(--maxW)'
        mx='auto'
        spacing='24px'
        alignItems='start'
      >
        <Text mb='16px' fontWeight='semibold' fontSize='20px'>
          History
        </Text>
        <Text mb='16px'>
          {historyText}
        </Text>
        <Flex alignItems='center' gap='16px'>
          <a href={socialMedia.facebook} target='_blank' rel='noopener noreferrer'>
            <Icon as={BiLogoFacebook} bgColor='#FFDC83' borderRadius='full' p='6px' fontSize='40px' color='black' />
          </a>
          <a href={socialMedia.twitter} target='_blank' rel='noopener noreferrer'>
            <Icon as={BiLogoTwitter} bgColor='#FFDC83' borderRadius='full' p='6px' fontSize='40px' color='black' />
          </a>
          <a href={socialMedia.instagram} target='_blank' rel='noopener noreferrer'>
            <Icon as={FaInstagram} bgColor='#FFDC83' borderRadius='full' p='6px' fontSize='40px' color='black' />
          </a>
        </Flex>
        <Flex gap='16px' mt='32px' alignItems='center'>
          <Icon as={FaLocationArrow} />
          <Text fontWeight='bold'>Philippines</Text>
          <Text opacity={0.6}>&copy; 2023 Calcium & Joyjoy</Text>
        </Flex>
      </VStack>
    </Box>
  );
}

export default Footer;
