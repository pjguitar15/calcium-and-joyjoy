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
      icon: BsFillPeopleFill,
      submenu: [
        {
          text: "Roles & Permissions",
          link: "/roles",
        },
        {
          text: "Customers",
          link: "/customers",
        },
        {
          text: "Authentication Settings",
          link: "/roles",
        },
      ],
    },
  ];

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

        {menu.map((item) => {
          return (
            <Accordion
              id='users'
              onChange={(e) => handleExpand(e, "users")}
              allowToggle
              w='100%'
            >
              <AccordionItem border='none'>
                <AccordionButton
                  bgColor={expanded === "users" ? "blackAlpha.2 00" : ""}
                  p='0px'
                >
                  <HStack
                    cursor='pointer'
                    w='100%'
                    py='16px'
                    justify='center'
                    gap='16px'
                  >
                    <Icon fontSize='24px' as={item.icon} />
                    <Text>{item.main}</Text>
                    <AccordionIcon />
                  </HStack>
                </AccordionButton>

                <AccordionPanel p='0px' mt='8px'>
                  <VStack align='normal'>
                    {item.submenu.map((sub) => (
                      <Box
                        w='100%'
                        h='100%'
                        py='16px'
                        pl='64px'
                        as={NavLink}
                        to={"/admin" + sub.link}
                        display='block'
                      >
                        {sub.text}
                      </Box>
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
      </VStack>
    </Box>
  );
}

export default Dashboard;
