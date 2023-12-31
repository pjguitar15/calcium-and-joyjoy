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
  BsGrid,
  BsTags,
  BsArrowsFullscreen,
  BsPalette,
  BsUiChecksGrid,
  BsMegaphone,
  BsInfoCircleFill
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
        text: "Categories",
        link: "/categories",
        icon: BsGrid,
      },
      {
        text: "Brands",
        link: "/brands",
        icon: BsTags,
      },
      {
        text: "Sizes",
        link: "/sizes",
        icon: BsArrowsFullscreen,
      },
      {
        text: "Colors",
        link: "/colors",
        icon: BsPalette,
      },
      {
        text: "Types",
        link: "/types",
        icon: BsUiChecksGrid,
      },
      {
        text: "Discounts",
        link: "/discounts",
        icon: BsTagFill,
      },
    ],
  },

  {
    main: "Order Process",
    icon: BsListUl,
    submenu: [
      {
        text: "Transaction Records",
        link: "/records",
        icon: BsFileEarmarkTextFill,
      },
      {
        text: "Orders & Tracking",
        link: "/orders",
        icon: BsWalletFill,
      },
      
    ],
  },
  {
    main: "Chat Support",
    icon: BsFillPeopleFill,
    submenu: [
      {
        text: "View Chats",
        link: "/chat-support",
        icon: BsFillPeopleFill,
      },
      {
        text: "FAQs",
        link: "/faqs",
        icon: BsInfoCircleFill,
      },
    ],
  },
  {
    main: "CMS",
    icon: BsTruck,
    submenu: [
      {
        text: "Payment Methods",
        link: "/payment",
        icon: BsWalletFill,
      },
      {
        text: "Courier Details",
        link: "/couriers",
        icon: BsTruck,
      },
      {
        text: "Announcement",
        link: "/announcement",
        icon: BsMegaphone,
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
    link: "/general-settings",
    type: "link" 
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
          item.type === "link" ?
            <HStack
              key={index}
              as={NavLink}
              to={"/admin" + item.link}
              className="cursor-pointer w-full py-4 px-6 justify-start gap-4"
            >
              <Icon className="text-xl" as={item.icon} />
              <Text>{item.main}</Text>
            </HStack>
          :
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
            localStorage.removeItem("adminId");
            localStorage.removeItem("adminInfo");
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
