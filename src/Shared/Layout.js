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
      <Box h='30vh' bgColor='gray.600' mt='80px' py='40px' px='16px'></Box>
    </>
  );
}

export default Layout;
