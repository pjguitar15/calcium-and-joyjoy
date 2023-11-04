import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { VscDashboard } from "react-icons/vsc";
import { BsFillPeopleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import { useState } from "react";

function Dashboard() {
  const [expanded, setExpanded] = useState(null);
  const menu = [
    {
      main: "User Management",
      icon: VscDashboard,
    },
  ];

  const dummyMenu = Array.from({
    length: 5,
  });

  const handleExpand = (num, id) => {
    if (num === 0) setExpanded(id);
    else setExpanded(null);
  };

  return (
    <Box
      pos='fixed'
      left='0'
      w='350px'
      bgColor='gray.600'
      color='white'
      h='100%'
    >
      <VStack fontSize='18px' py='24px'>
        <Image src='/assets/logoheader.png' />
        <Text fontSize='32px'>Admin Dashboard</Text>
        <Divider w='80%' />

        <HStack
          as={NavLink}
          to='/admin'
          end
          cursor='pointer'
          w='100%'
          py='16px'
          justify='center'
          gap='16px'
        >
          <Icon fontSize='24px' as={VscDashboard} />
          <Text>Dashboard Overview</Text>
        </HStack>
        <Accordion
          id='users'
          onChange={(e) => handleExpand(e, "users")}
          allowToggle
          w='100%'
          bgColor={expanded === "users" ? "gray.500" : ""}
        >
          <AccordionItem border='none'>
            <AccordionButton p='0px'>
              <HStack
                cursor='pointer'
                w='100%'
                py='16px'
                justify='center'
                gap='16px'
              >
                <Icon fontSize='24px' as={BsFillPeopleFill} />
                <Text>User Management</Text>
                <AccordionIcon />
              </HStack>
            </AccordionButton>
            <AccordionPanel bgColor='red' w='100%'>
              <NavLink>Roles & Permissions</NavLink>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
}

export default Dashboard;
