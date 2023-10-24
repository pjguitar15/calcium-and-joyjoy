import { Box, useMediaQuery } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

import { useEffect } from "react";
import DrawerNav from "./DrawerNav";
import Footer from "./Footer";
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
      <Box>
        <Box minH='55.2vh' maxW='var(--maxW)' mx='auto' p='40px'>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
