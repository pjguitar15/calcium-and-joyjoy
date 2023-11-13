import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Image,
  Heading,
  VStack,
  Input,
  Button,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [showPass, setShowPass] = useState(false);

  const onLogin = (data) => {
    console.log(data);
  };
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

      <VStack onSubmit={handleSubmit(onLogin)} as='form' gap='16px'>
        <Input {...register("email")} placeholder='Email address' />
        <InputGroup>
          <Input
            {...register("password")}
            placeholder='Password'
            type={!showPass ? "password" : "text"}
          />
          <InputRightAddon
            onClick={() => setShowPass(!showPass)}
            cursor='pointer'
            children={showPass ? <ViewIcon /> : <ViewOffIcon />}
          />
        </InputGroup>
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
