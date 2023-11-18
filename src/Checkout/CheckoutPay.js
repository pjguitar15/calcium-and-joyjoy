import {
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Receipt from "./Receipt";

function CheckoutPay({ onBack, onPay }) {
  const [payment, setPayment] = useState("1");
  return (
    <Box>
      <Text fontSize='24px' fontWeight='semibold' mb='24px' mt='48px'>
        Courier
      </Text>
      <RadioGroup
        defaultValue='1'
        borderRadius='10px'
        p='16px 32px'
        border='solid 1px #d1d1d1'
      >
        <VStack align='normal'>
          <Radio value='1'>J&T Express</Radio>
          <Divider />
          <Radio value='2'>LBC</Radio>
        </VStack>
      </RadioGroup>

      <Text fontSize='24px' fontWeight='semibold' mb='24px' mt='48px'>
        Payment Method
      </Text>
      <RadioGroup
        borderRadius='10px'
        p='16px 32px'
        border='solid 1px #d1d1d1'
        value={payment}
        onChange={setPayment}
      >
        <VStack align='normal'>
          <Radio value='1'>Gcash</Radio>
          {payment === "1" && (
            <VStack alignItems='normal' fontWeight='semibold'>
              <Text>Number: 0922-tutunog-tunog</Text>
              <Text>Name: Calcium A. Joyjoy</Text>
            </VStack>
          )}
          <Divider />
          <Radio value='2'>Bank Transfer</Radio>
          {payment === "2" && (
            <VStack alignItems='normal' fontWeight='semibold'>
              <Text>Bank: BDO Unibank</Text>
              <Text>Account Number: 123-4567-8901</Text>
            </VStack>
          )}
          <Receipt onUpload={(file) => console.log(file)} />
        </VStack>
      </RadioGroup>

      <Grid mt='24px' gap='40px' gridTemplateColumns='1fr 1fr'>
        <Button borderRadius='20px' p='16px 40px' onClick={onBack}>
          Back
        </Button>
        <Button borderRadius='20px' p='16px 40px' onClick={onPay}>
          Continue
        </Button>
      </Grid>
    </Box>
  );
}

export default CheckoutPay;
