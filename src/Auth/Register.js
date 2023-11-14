import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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
  // const [country, SetCountry] = useState("Philippines");
  const [showPass, setShowPass] = useState(true);
  const toast = useToast();

  const { register, handleSubmit } = useForm();
  const onReg = async (data) => {
    const res = await axiosInstance.post("/register", data);
    console.log(res.data.data);
    // return
  };

  const { mutate } = useMutation({
    mutationFn: onReg,
    onSuccess: () => {
      toast({ title: "Account created", status: "success", position: "top" });
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

        <HStack w='100%'>
          {/* <Input type='date' /> */}
          {/* <Select>
            <option value='' selected disabled hidden>
              Gender
            </option>
            <option value='option1'>String</option>
            <option value='option2'>Cobra</option>
            <option value='option3'>Coffee</option>
          </Select> */}
        </HStack>
        {/* <Select
          as={CountryDropdown}
          value={country}
          onChange={(e) => SetCountry(e)}
        /> */}
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
