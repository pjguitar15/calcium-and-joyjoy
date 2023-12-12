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
  BsGear,
  BsGlobe,
  BsPersonBadgeFill,
  BsCartFill,
  BsTruck,
  BsTagFill,
  BsWalletFill,
  BsFileEarmarkTextFill,
  BsGraphUp,
  BsPeopleFill,
  BsHouseDoorFill,
} from "react-icons/bs";

import { CgLogOut } from "react-icons/cg";

import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const menu = [
  {
    main: "User Management",
    icon: BsFillPeopleFill,
    submenu: [
      {
        text: "Roles & Permissions",
        link: "/roles",
        icon: BsPersonBadgeFill,
      },
      {
        text: "Customers",
        link: "/customers",
        icon: BsPeopleFill,
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
        icon: BsCartFill,
      },
      {
        text: "Courier Details",
        link: "/couriers",
        icon: BsTruck,
      },
      {
        text: "Discounts & Offers",
        link: "/discounts",
        icon: BsTagFill,
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
        icon: BsWalletFill,
      },

      {
        text: "Shipping Management",
        link: "/shipping",
        icon: BsTruck,
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
        icon: BsWalletFill,
      },
      {
        text: "Transaction Records",
        link: "/records",
        icon: BsFileEarmarkTextFill,
      },
    ],
  },
  {
    main: "Reports & Analytics",
    icon: BsGraphUp,
    submenu: [
      {
        text: "Sales Report",
        link: "/sales",
        icon: BsGraphUp,
      },
      {
        text: "User Behavior",
        link: "/behavior",
        icon: BsPeopleFill,
      },
      {
        text: "Product Performance",
        link: "/product-performance",
        icon: BsCartFill,
      },
    ],
  },
  {
    main: "General Settings",
    icon: BsGear,
    submenu: [
      {
        text: "Website Configuration",
        link: "/website-configuration",
        icon: BsGlobe,
      },
      {
        text: "Basic Info",
        link: "/basic-info",
        icon: BsHouseDoorFill,
      },
    ],
  },
];

function Dashboard() {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const handleExpand = (num, id) => {
    if (num === 0) setExpanded(id);
    else setExpanded(null);
  };

  return (
    <Box className="fixed left-0 w-[350px] bg-gray-700 text-white h-full overflow-y-auto">
      <VStack className="text-lg py-6">
        <Image src="/assets/logoheader.png" />
        <Text className="text-2xl">Admin Dashboard</Text>
        <Divider className="w-full my-2" />

        <HStack
          as={NavLink}
          to="/admin"
          end
          className="cursor-pointer w-full py-4 px-6 justify-start gap-4"
        >
          <Icon className="text-xl" as={BsSpeedometer2} />
          <Text>Dashboard Overview</Text>
        </HStack>

        {menu.map((item, index) => (
          <Accordion
            key={index}
            onChange={() => handleExpand(expanded === item.main ? null : item.main)}
            allowToggle
            className="w-full"
          >
            <AccordionItem className="border-none">
              <AccordionButton
                _hover={{ bgColor: "blackAlpha.300" }}
                bgColor={expanded === item.main ? "blackAlpha.300" : ""}
                className="p-0"
              >
                <HStack className="cursor-pointer w-full py-4 px-6 justify-start gap-4">
                  <Icon className="text-xl" as={item.icon} />
                  <Text>{item.main}</Text>
                  {item.submenu && <AccordionIcon />}
                </HStack>
              </AccordionButton>

              <AccordionPanel className="p-0">
                <VStack align="start">
                  {item.submenu &&
                    item.submenu.map((sub, subIndex) => (
                      <Box
                        key={subIndex}
                        as={NavLink}
                        to={"/admin" + sub.link}
                        className="w-full py-4 pl-16 pr-6 flex justify-start items-center gap-4"
                      >
                        <Icon className="text-lg" as={sub.icon} />
                        {sub.text}
                      </Box>
                    ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem("adminLoginToken");
            navigate("/admin/login");
          }}
          className="text-lg mt-3 flex items-center gap-2 px-6 w-full justify-start"
        >
          <CgLogOut className="text-xl" />
          Logout
        </button>
      </VStack>
    </Box>
  );
}

export default Dashboard;
