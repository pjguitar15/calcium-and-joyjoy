import { Box } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
function AdminPage() {
  const [isLoginPage, setIsLoginPage] = useState(true)
  const location = useLocation()
  useEffect(() => {
    setIsLoginPage(location.pathname === "/admin/login");
  }, [location])
  return (
    <Box>
      {!isLoginPage && <Dashboard />}
      <Box ml={!isLoginPage && `350px`} p='32px 32px'>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminPage;
