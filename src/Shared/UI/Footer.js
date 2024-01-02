import React, { useState, useEffect } from 'react';
import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { BiLogoTwitter, BiLogoFacebook, BiLogoWhatsapp } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import axiosInstance from "../utils/axiosInstance";  // Adjust the path as necessary

const socials = [
  {
    icon: BiLogoFacebook,
    link: "https://www.facebook.com/",
    text: "Calcium Joyjoy PH",
  },
  {
    icon: BiLogoTwitter,
    link: "https://twitter.com/home",
    text: "calciumjoyjoyonlineshop",
  },
  {
    icon: BiLogoWhatsapp,
    link: "",
    text: "MJ Muit 09750327117",
  },
];

function Footer() {
  const [historyText, setHistoryText] = useState('Loading history...');

  useEffect(() => {
    axiosInstance.get('/admin/general-settings')
      .then(response => {
        setHistoryText(response.data.history_text);
      })
      .catch(error => {
        console.error("Error fetching history text:", error);
        setHistoryText("Error loading history. Please try again later.");
      });
  }, []);

  return (
    <Box bgColor='#403F3F' py='40px' px='40px' color='#FFDC83'>
      <HStack
        maxW='var(--maxW)'
        mx='auto'
        justifyContent='space-between'
        rowGap='80px'
        flexDir={{ base: "column", md: "row" }}
        columnGap='240px'
      >
        <VStack h='100%' alignItems='start'>
          <Text mb='16px' fontWeight='semibold' fontSize='20px'>
            History
          </Text>
          <Text mb='56px'>
            {historyText}
          </Text>
          <HStack gap='16px'>
            <Text fontWeight='bold'>
              <Icon as={FaLocationDot} /> Philippines
            </Text>
            <Text opacity={0.6}>&copy; 2023 Calcium & Joyjoy</Text>
          </HStack>
        </VStack>
        <VStack gap='24px' alignItems='start'>
          {socials.map((item) => (
            <HStack
              gap='16px'
              key={item.text}
              alignItems='center'
              justify='start'
            >
              <Icon
                cursor='pointer'
                bgColor='#FFDC83'
                as={item.icon}
                borderRadius='full'
                p='6px'
                fontSize='40px'
                color='black'
              />
              <Text fontSize='16px'>{item.text}</Text>
            </HStack>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
}

export default Footer;
