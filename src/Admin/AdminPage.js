import { Box } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";
function AdminPage() {
  return (
    <Box>
      <Dashboard />
      <Box ml='350px' p='72px 32px'>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminPage;
