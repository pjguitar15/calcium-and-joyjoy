import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import Register from "./Register";
import Login from "./Login";
import Verify from "./Verify";

function AuthPage() {
  const { action, otp } = useParams();
  const [emailForVerification, setEmailForVerification] = useState('');

  useEffect(() => {
    // Check local storage for any persisted registration state
    const storedEmail = localStorage.getItem('emailForVerification');
    if (storedEmail) {
      setEmailForVerification(storedEmail);
    }
  }, []);

  const handleRegistrationComplete = (email) => {
    localStorage.setItem('emailForVerification', email); // Persist email to local storage
    setEmailForVerification(email);
  };

  return (
    <Box>
      {action === "register" && !otp && (
        <Register onVerify={handleRegistrationComplete} />
      )}
      {action === "sign-in" && !otp && <Login />}
      {otp && <Verify email={emailForVerification} otp={otp} />}
    </Box>
  );
}

export default AuthPage;
