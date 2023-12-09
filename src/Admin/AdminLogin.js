import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
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
} from "@chakra-ui/react"

import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../Shared/utils/axiosInstance"
import axios from 'axios'
function AdminLogin() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toast = useToast()

  const onLogin = async (e) => {
    e.preventDefault()
    axios.post(`http://18.223.157.202/backend/api/admin/login?email=${email}&password=${password}`).then((res) => {
      console.log(res.data)
      if (res.data.message) {
        toast({ status: "error", title: res.data.message, position: "top" });
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Box maxW="400px" mx="auto">
      <Box mb="40px">
        <Image src="/assets/calciumlogo.png" mx="auto" />
        <Center>
          <Heading
            color="#F8EB26"
            fontWeight="extrabold"
            filter="drop-shadow(2px 2px 4px rgba(0,0,0,.3)"
            style={{
              WebkitTextStroke: "2px black",
            }}
          >
            ADMIN LOGIN
          </Heading>
        </Center>
      </Box>

      <VStack onSubmit={onLogin} as="form" gap="16px">
        <FormControl variant="floating" isRequired>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " />
          <FormLabel>Email</FormLabel>
        </FormControl>

        <FormControl pos="relative" isRequired variant="floating">
          <Input
            value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            type={!showPass ? "password" : "text"}
            pr="40px"
          />
          <FormLabel>Password</FormLabel>
          {showPass && (
            <ViewIcon
              onClick={() => setShowPass(false)}
              top="50%"
              transform="translateY(-50%)"
              right="8px"
              pos="absolute"
              zIndex={2}
              cursor="pointer"
              h="100%"
              w="24px"
            />
          )}
          {!showPass && (
            <ViewOffIcon
              onClick={() => setShowPass(true)}
              top="50%"
              transform="translateY(-50%)"
              right="8px"
              pos="absolute"
              zIndex={2}
              cursor="pointer"
              h="100%"
              w="24px"
            />
          )}
        </FormControl>

        <Button
          bgColor="var(--primary)"
          color="white"
          type="submit"
          px="56px"
          py="16px"
          _hover={{
            bgColor: "var(--accent)",
          }}
        >
          Sign In
        </Button>
        <Box fontSize="14px">
          Not a member?{" "}
          <Link to="/auth/register">
            <Button color="#A5B92D" variant="link" fontSize="14px">
              Create Account
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  )
}

export default AdminLogin
