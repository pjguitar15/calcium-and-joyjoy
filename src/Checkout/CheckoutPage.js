import {
  Grid,
  HStack,
  Input,
  Select,
  VStack,
  Text,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import { CountryDropdown } from "react-country-region-selector";
function CheckoutPage() {
  return (
    <Grid
      alignItems='start'
      alignContent='start'
      gap={{ base: "80px", lg: "200px" }}
      maxW='1000px'
      gridTemplateColumns={{ base: "1fr", lg: "5.5fr 4.5fr" }}
      mx='auto'
    >
      <VStack gap='16px' align='normal'>
        <Select defaultOptionLabel='Country/Region' as={CountryDropdown} />
        <HStack>
          <Input placeholder='First Name' />
          <Input placeholder='Last Name' />
        </HStack>
        <Input placeholder='Barangay' />
        <Input placeholder='Street/Building Name' />
        <HStack>
          <Input placeholder='Postal Code' />
          <Input placeholder='City' />
        </HStack>
        <Text>Contact information:</Text>
        <Input placeholder='Email' />
        <Input placeholder='Phone Number' />
        <Button borderRadius='80px' w='fit-content' mx='auto' px='120px'>
          Continue
        </Button>
      </VStack>
      <Box>
        <Heading fontWeight='normal' mb='24px'>
          Order Summary
        </Heading>
        <Box color='gray.500' borderBottom='solid 1px #d1d1d1' pb='16px'>
          <HStack justifyContent='space-between'>
            <Text>Subtotal</Text>
            <Text>&#8369;1</Text>
          </HStack>
          <HStack justifyContent='space-between'>
            <Text>Shipping</Text>
            <Text>&#8369;1</Text>
          </HStack>
        </Box>
        <HStack
          justifyContent='space-between'
          borderBottom='solid 1px #d1d1d1'
          pt='8px'
          pb='16px'
        >
          <Text>Total</Text>
          <Text>&#8369;1</Text>
        </HStack>
      </Box>
    </Grid>
  );
}

export default CheckoutPage;
