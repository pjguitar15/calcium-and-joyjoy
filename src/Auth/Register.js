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
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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

function Register() {
  const [showPass, setShowPass] = useState(true);

  const toast = useToast();
  const nav = useNavigate();

  const { register, handleSubmit } = useForm();
  const onReg = async (data) => {
    const { password, confirmPassword } = data;
    if (password.trim() !== confirmPassword.trim())
      return toast({
        title: "Passwords do not match",
        position: "top",
        status: "error",
      });
    const res = await axiosInstance.post("/register", data);
    return res.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: onReg,
    onSuccess: async (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      toast({
        title: "Account created",
        status: "success",
        position: "top",
        description: "Going back to home page",
      });
      setTimeout(() => {
        nav("/");
      }, 1500);
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
            type={!showPass ? "password" : "text"}
            pr='40px'
          />
          <FormLabel>Password</FormLabel>
          {showPass && (
            <ViewIcon
              onClick={() => setShowPass(false)}
              top='50%'
              transform='translateY(-50%)'
              right='8px'
              pos='absolute'
              zIndex={2}
              cursor='pointer'
              h='100%'
              w='24px'
            />
          )}
          {!showPass && (
            <ViewOffIcon
              onClick={() => setShowPass(true)}
              top='50%'
              transform='translateY(-50%)'
              right='8px'
              pos='absolute'
              zIndex={2}
              cursor='pointer'
              h='100%'
              w='24px'
            />
          )}
        </FormControl>
        <FormControl pos='relative' isRequired variant='floating'>
          <Input
            {...register("confirmpPassword")}
            placeholder=' '
            type={!showPass ? "password" : "text"}
            pr='40px'
          />
          <FormLabel>Confirm Password</FormLabel>
          {showPass && (
            <ViewIcon
              onClick={() => setShowPass(false)}
              top='50%'
              transform='translateY(-50%)'
              right='8px'
              pos='absolute'
              zIndex={2}
              cursor='pointer'
              h='100%'
              w='24px'
            />
          )}
          {!showPass && (
            <ViewOffIcon
              onClick={() => setShowPass(true)}
              top='50%'
              transform='translateY(-50%)'
              right='8px'
              pos='absolute'
              zIndex={2}
              cursor='pointer'
              h='100%'
              w='24px'
            />
          )}
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
