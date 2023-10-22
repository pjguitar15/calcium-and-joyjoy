import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { Link } from "react-router-dom";

function Register() {
  const [country, SetCountry] = useState("Philippines");
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

      <VStack gap='16px'>
        <Input p='8px 16px' placeholder='First Name' />
        <Input p='8px 16px' placeholder='Last Name' />
        <Input p='8px 16px' placeholder='Email Address' />
        <Input p='8px 16px' placeholder='Password' />
        <HStack w='100%'>
          <Input type='date' />
          <Select>
            <option value='' selected disabled hidden>
              Gender
            </option>
            <option value='option1'>String</option>
            <option value='option2'>Cobra</option>
            <option value='option3'>Coffee</option>
          </Select>
        </HStack>
        <Select
          as={CountryDropdown}
          value={country}
          onChange={(e) => SetCountry(e)}
        />
        <Button px='56px' py='16px'>
          Create Account
        </Button>
        <Box fontSize='14px'>
          Already a member?{" "}
          <Link to='/auth/sign-in'>
            <Button textDecor='underline' variant='link' fontSize='14px'>
              Sign in
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}

export default Register;
