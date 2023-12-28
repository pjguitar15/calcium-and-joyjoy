import { Box, useMediaQuery } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

import { useEffect } from "react";
//import { useQuery } from "react-query";

import DrawerNav from "./DrawerNav";
import Footer from "./Footer";
import Joypop from "../../Joybot/Joypop";
//import axiosInstance from "../utils/axiosInstance";

function Layout() {
  const [isLg] = useMediaQuery("(min-width: 992px)");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  // const getDynamics = async () => {
  //   const res = await axiosInstance.get(`/admin/general-settings`);
  //   return res.data;
  // };

  // const { data: dynamics } = useQuery({
  //   queryKey: "dynamicItems",
  //   queryFn: getDynamics,
  // });

  // console.log(dynamics);

  return (
    <Box
      bg={pathname.includes("about") ? `url('/assets/BigLogo.svg')` : ""}
      bgPos='center'
      bgRepeat='no-repeat'
      bgColor={pathname.includes("about") ? "#413F3FFA" : ""}
    >
      {isLg && <Navbar />}
      {!isLg && <DrawerNav />}

      <Box display='flex' flexDir='column' minH='100vh'> 
       <Joypop />
      <Box
        flexGrow='1'
        maxW='var(--maxW)'
        w='100%'
        mx='auto'
        p='40px 8px 120px'
        minH='100vh'
      >
        <Outlet />
      </Box>
      <Footer />
       </Box>
    </Box>
  );
}

export default Layout;
