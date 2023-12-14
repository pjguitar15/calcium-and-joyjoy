import {
  Box,
  Center,
  Image,
  Heading,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";

function Verify() {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const onVerify = async (data) => {
    const res = await axiosInstance.post("/otp/verify", data);
    return res.data.data;
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: onVerify,
    onSuccess: () => {
      toast({
        position: "top",
        status: "success",
        title: "Account verified.",
        description: "Redirecting to login",
      });
      setTimeout(() => {
        window.location.href = '/auth/sign-in'; // Redirect and refresh the page
      }, 1500);
    },
    onError: () => {
      toast({ position: "top", status: "error", title: "Invalid OTP" });
    },
  });
  
  
  return (
    <Box maxW='400px' mx='auto'>
      <Box mb='40px'>
        <Image src='/assets/calciumlogo.png' mx='auto' />
        <Center>
          <Heading
            color='#F8EB26'
            fontWeight='extrabold'
            filter='drop-shadow(2px 2px 4px rgba(0,0,0,.3)'
            style={{
              WebkitTextStroke: "2px black",
            }}
          >
            YOUR ACCOUNT
          </Heading>
        </Center>
      </Box>

      <VStack as='form' onSubmit={handleSubmit(mutate)} gap='16px'>
        <FormControl variant='floating' isRequired>
          <Input {...register("email")} placeholder=' ' />
          <FormLabel>Email</FormLabel>
        </FormControl>

        <FormControl pos='relative' isRequired variant='floating'>
          <Input placeholder=' ' pr='40px' {...register("otp")} />
          <FormLabel>OTP</FormLabel>
        </FormControl>

        <Button
          bgColor='var(--primary)'
          color='white'
          type='submit'
          px='56px'
          py='16px'
          _hover={{
            bgColor: "var(--accent)",
          }}
          isLoading={isLoading}
        >
          Verify
        </Button>
      </VStack>
    </Box>
  );
}

export default Verify;
