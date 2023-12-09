import "./Dashboard.css";

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

import {
  BsSpeedometer2,
  BsFillPeopleFill,
  BsBoxSeam,
  BsListUl,
  BsCreditCard,
} from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";

import { NavLink } from "react-router-dom";
import { useState } from "react";

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
        link: "/auth",
      },
    ],
  },
  {
    main: "Product Management",
    icon: BsBoxSeam,
    submenu: [
      {
        text: "Products",
        link: "/products",
      },
      {
        text: "Courier Details",
        link: "/couriers",
      },
      {
        text: "Discounts & Offers",
        link: "/discounts",
      },
    ],
  },
  {
    main: "Order Management",
    icon: BsListUl,
    submenu: [
      {
        text: "Orders & Tracking",
        link: "/orders",
      },
      {
        text: "Refunds & Returns",
        link: "/refunds",
      },
      {
        text: "Shipping Management",
        link: "/shipping",
      },
    ],
  },
  {
    main: "Payment Management",
    icon: BsCreditCard,
    submenu: [
      {
        text: "Payment Methods",
        link: "/payment",
      },
      {
        text: "Transaction Records",
        link: "/records",
      },
    ],
  },
  {
    main: "Reports & Analytics",
    icon: BiLineChart,
    submenu: [
      {
        text: "Sales Report",
        link: "/sales",
      },
      {
        text: "User Behavior",
        link: "/behavior",
      },
      {
        text: "Product Performance",
        link: "/product-performance",
      },
    ],
  },
];

function Dashboard() {
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (num, id) => {
    if (num === 0) setExpanded(id);
    else setExpanded(null);
  };

  return (
    <Box
      pos='fixed'
      left='0'
      w='350px'
      bgColor='#403F3F'
      color='white'
      h='100%'
      overflowY='auto'
    >
      <VStack fontSize='18px' py='24px'>
        <Image src='/assets/logoheader.png' />
        <Text fontSize='26px'>Admin Dashboard</Text>
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
          <Icon fontSize='24px' as={BsSpeedometer2} />
          <Text>Dashboard Overview</Text>
        </HStack>

        {menu.map((item) => {
          return (
            <Accordion
              id='users'
              onChange={(e) => handleExpand(e, item.main)}
              allowToggle
              w='100%'
            >
              <AccordionItem border='none'>
                <AccordionButton
                  _hover={{
                    bgColor: "blackAlpha.300",
                  }}
                  bgColor={expanded === item.main ? "blackAlpha.300" : ""}
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
