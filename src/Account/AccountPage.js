import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function AccountPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return navigate("/");

  console.log(user);

  const { firstname, lastname, email } = user.user_info;
  const detailItems = ["Order Details", "Delivery Addresses"];

  const fields = [
    {
      label: "First Name",
      id: "firstname",
      defaultVal: firstname,
    },
    {
      label: "Last Name",
      id: "lastname",
      defaultVal: lastname,
    },
    {
      label: "Email",
      id: "email",
      defaultVal: email,
    },
    {
      label: "Phone Number",
      id: "phone_number",
      defaultVal: "",
      type: "number",
    },
    // {
    //   label: "Email",
    //   id: "email",
    //   defaultVal: email,
    // },
  ];

  return (
    <Grid columnGap='40px' gridTemplateColumns='3fr 7fr'>
      <Heading mb='40px' gridColumn='1/-1' fontWeight='semibold'>
        My Account
      </Heading>
      <Box pos='relative'>
        <Text pb='16px' fontWeight='semibold' fontSize='32px'>
          Details
        </Text>
        <Divider w='90%' borderColor='black' mb='32px' />
        <VStack gap='32px' align='start'>
          {detailItems.map((item) => (
            <Button
              color='gray.500'
              fontSize='24px'
              key={item}
              variant='unstyled'
              fontWeight='normal'
            >
              {item}
            </Button>
          ))}
          <Button
            fontSize='24px'
            fontWeight='semibold'
            color='red.500'
            variant='unstyled'
          >
            Logout
          </Button>
        </VStack>
        <Divider
          pos='absolute'
          right='0'
          top='0'
          orientation='vertical'
          borderColor='black'
        />
      </Box>
      <VStack gap='24px' maxW='560px'>
        {fields.map((item) => (
          <FormControl pos='relative' key={item.id} variant='floating'>
            <Input
              type={item.type || "text"}
              placeholder=' '
              defaultValue={item.defaultVal}
            />
            <FormLabel>
              {item.defaultVal.trim().length !== 0
                ? item.label
                : `Add ${item.label}`}
            </FormLabel>
          </FormControl>
        ))}
      </VStack>
    </Grid>
  );
}

export default AccountPage;
