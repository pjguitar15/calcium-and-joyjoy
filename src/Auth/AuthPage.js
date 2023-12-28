import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

import Register from "./Register";
import Login from "./Login";
import Verify from "./Verify";

function AuthPage() {
  const { action } = useParams();
  const [verifying, setVerifying] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState('');

  // Handle completion of the registration process
  const handleRegistrationComplete = (email) => {
    setEmailForVerification(email); // Store the email for verification
    setVerifying(true); // Change state to show verification component
  };

  return (
    <Box>
      {action === "register" && !verifying && (
        <Register onVerify={handleRegistrationComplete} />
      )}
      {action === "sign-in" && !verifying && <Login />}
      {verifying && <Verify email={emailForVerification} />}
    </Box>
  );
}

export default AuthPage;
