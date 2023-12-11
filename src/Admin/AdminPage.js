import { Box } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
function AdminPage() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('adminLoginToken')) navigate("/admin/login")
  }, [])

  return (
    <Box>
      <Dashboard />
      <Box ml={`350px`} p='32px 32px'>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminPage;
