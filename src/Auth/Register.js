import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";

const fields = [
  {
    label: "First Name",
    id: "firstname",
  },
  {
    label: "Last Name",
    id: "lastname",
  },
  {
    label: "Email",
    id: "email",
  },
];

function Register({ onVerify }) {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate

  const onReg = async (data) => {
    const { password, confirmPassword, email } = data;
    if (password.trim() !== confirmPassword.trim()) {
      toast({
        title: "Passwords do not match",
        position: "top",
        status: "error",
      });
      throw new Error("Passwords do not match");
    } else {
      const res = await axiosInstance.post("/register", data);
      return { ...res.data.data, email }; // Include email in the returned data
    }
  };

  const { mutate } = useMutation({
    mutationFn: onReg,
    onSuccess: (data) => {
      toast({
        status: "info",
        description: "Verify your email",
        position: "top",
      });
      onVerify(data.email); // Pass the email to the onVerify callback
      navigate(`/otp`); // Programmatically navigate to the OTP verification page
    },
    onError: (data) => {
      toast({
        title: data.response.data.message,
        status: "error",
        position: "top",
      });
    },
  });

  return (
    <Box mx='auto' maxW='400px'>
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
            BECOME A MEMBER
          </Heading>
        </Center>
      </Box>

      <VStack as='form' onSubmit={handleSubmit(mutate)} gap='16px'>
        {fields.map((item) => (
          <FormControl key={item.label} variant='floating' isRequired>
            <Input {...register(item.id)} placeholder=' ' />
            <FormLabel>{item.label}</FormLabel>
          </FormControl>
        ))}
        <FormControl pos='relative' isRequired variant='floating'>
          <Input
            {...register("password")}
            placeholder=' '
            type='password'
            pr='40px'
          />
          <FormLabel>Password</FormLabel>
        </FormControl>
        <FormControl pos='relative' isRequired variant='floating'>
          <Input
            {...register("confirmPassword")}
            placeholder=' '
            type='password'
            pr='40px'
          />
          <FormLabel>Confirm Password</FormLabel>
        </FormControl>

        <Button
          color='white'
          bgColor='var(--primary)'
          _hover={{
            bgColor: "var(--accent)",
          }}
          type='submit'
          px='56px'
          py='16px'
        >
          Create Account
        </Button>
        <Box fontSize='14px'>
          Already a member?{" "}
          <Link to='/auth/sign-in'>
            <Button
              color='#A5B92D'
              textDecor='underline'
              variant='link'
              fontSize='14px'
            >
              Sign in
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}

export default Register;
