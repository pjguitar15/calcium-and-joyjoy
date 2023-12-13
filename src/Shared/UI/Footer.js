import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { BiLogoTwitter, BiLogoFacebook, BiLogoWhatsapp } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

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
            Calcium JoyJoy Online Shop PH is a successful e-commerce venture on
            social media, with a focus on offering branded shoes and
            accompanying accessories like aglets, shoelaces, and socks.
            Established on August 19, 2018, the business initially began with
            pre-order items. Ms. Mary Joy "MJ" Muit, the devoted owner, manages
            the company, which is duly registered with the DTI.
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
