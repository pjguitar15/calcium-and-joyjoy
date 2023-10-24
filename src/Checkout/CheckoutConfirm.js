import {
  Grid,
  HStack,
  Input,
  Select,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import OrderSummary from "./OrderSummary";
function CheckoutConfirm({ onConfirm }) {
  const [country, setCountry] = useState("Philippines");
  // const
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
        <Select
          defaultOptionLabel='Country/Region'
          as={CountryDropdown}
          value={country}
          onChange={(e) => setCountry(e)}
        />
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
        <Button
          onClick={onConfirm}
          borderRadius='80px'
          w='fit-content'
          mx='auto'
          px='120px'
        >
          Continue
        </Button>
      </VStack>
      <OrderSummary />
    </Grid>
  );
}

export default CheckoutConfirm;
