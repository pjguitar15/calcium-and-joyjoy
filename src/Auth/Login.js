import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../Shared/utils/axiosInstance";
function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [showPass, setShowPass] = useState(true);

  const toast = useToast();

  const onLogin = async (creds) => {
    const res = await axiosInstance.post("/login", creds);
    return res.data.data;
  };

  const { mutate } = useMutation({
    mutationFn: onLogin,
    onSuccess: (data) => {
      toast({ status: "success", title: "Login successful", position: "top" });
      reset();
    },
    onError: () => {
      toast({ status: "error", title: "Invalid credentials", position: "top" });
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

      <VStack onSubmit={handleSubmit(mutate)} as='form' gap='16px'>
        <FormControl variant='floating' isRequired>
          <Input {...register("email")} placeholder=' ' />
          <FormLabel>Email</FormLabel>
        </FormControl>

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

        <Button type='submit' px='56px' py='16px'>
          Sign In
        </Button>
        <Box fontSize='14px'>
          Not a member?{" "}
          <Link to='/auth/register'>
            <Button variant='link' fontSize='14px'>
              Create Account
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}

export default Login;
