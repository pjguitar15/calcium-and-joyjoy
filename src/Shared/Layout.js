import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <Box maxW='var(--maxW)' mx='auto' p='40px'>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
