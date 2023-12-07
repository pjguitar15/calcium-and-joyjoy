import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import Verify from "./Verify";

function AuthPage() {
  const { action } = useParams();
  const [verifying, setVerifying] = useState(false);

  return (
    <Box>
      {action === "register" && !verifying && (
        <Register onVerify={() => setVerifying(true)} />
      )}
      {action === "sign-in" && !verifying && <Login />}
      {verifying && <Verify />}
    </Box>
  );
}

export default AuthPage;
