import "./Dashboard.css"

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
} from "@chakra-ui/react"

import {
  BsSpeedometer2,
  BsFillPeopleFill,
  BsBoxSeam,
  BsListUl,
  BsCreditCard,
} from "react-icons/bs"
import { BiLineChart } from "react-icons/bi"
import { CgLogOut } from "react-icons/cg"

import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"

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
]

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

        {/* Map through menu items */}
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
                        <Icon className="text-lg" as={item.icon} />
                        {sub.text}
                      </Box>
                    ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}

        {/* Logout Button */}
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