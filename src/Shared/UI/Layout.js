import { Box, useMediaQuery } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

import { useEffect } from "react";
import DrawerNav from "./DrawerNav";
import Footer from "./Footer";
import Joypop from "../../Joybot/Joypop";
function Layout() {
  const [isLg] = useMediaQuery("(min-width: 992px)");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      {isLg && <Navbar />}
      {!isLg && <DrawerNav />}

      {/* <Box display='flex' flexDir='column' minH='100vh'> */}
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
      {/* </Box> */}
    </>
  );
}

export default Layout;
