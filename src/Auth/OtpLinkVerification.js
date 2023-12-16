/* import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";

function OtpLinkVerification() {
  const { otp } = useParams(); // Extracting OTP from URL
  const navigate = useNavigate();
  const toast = useToast();

  const verifyOtp = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email || !otp) {
        throw new Error("Email or OTP missing");
      }
      const res = await axiosInstance.post("/otp/verify", { email, otp });
      return res.data.data;
    } catch (error) {
      throw error;
    }
  };
  

  const { mutate, isLoading } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast({
        position: "top",
        status: "success",
        title: "Account verified",
        description: "Your account has been successfully verified. Please login.",
        duration: 9000,
        isClosable: true,
      });
      setTimeout(() => navigate('/auth/sign-in'), 1500);
    },
    onError: () => {
      toast({
        position: "top",
        status: "error",
        title: "Verification failed",
        description: "Invalid OTP or already verified. Please login if already verified.",
        duration: 9000,
        isClosable: true,
      });
      navigate('/auth/sign-in');
    },
  });

  useEffect(() => {
    if (otp) {
      toast({
        position: "top",
        title: "Verifying Your Account",
        description: "Please wait while we verify your account. This should only take a moment.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      mutate();
    } else {
      navigate('/auth/sign-in');
    }
  }, [otp, mutate, navigate, toast]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return null; // Render nothing since we're handling everything with toasts
}

export default OtpLinkVerification;

*/
