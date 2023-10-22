import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Register from "./Register";
import Login from "./Login";

function AuthPage() {
  const { action } = useParams();
  return (
    <Box>
      {action === "register" && <Register />}

      {action === "sign-in" && <Login />}
    </Box>
  );
}

export default AuthPage;
