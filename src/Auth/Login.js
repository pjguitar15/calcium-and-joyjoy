import {
  Box,
  Center,
  Image,
  Heading,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Login() {
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

      <VStack gap='16px'>
        <Input placeholder='Email address' />
        <Input placeholder='Password' />
        <Button px='56px' py='16px'>
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
