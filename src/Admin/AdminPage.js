import { Box } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
function AdminPage() {
  return (
    <Box>
      <Dashboard />
      <Outlet />
    </Box>
  );
}

export default AdminPage;
