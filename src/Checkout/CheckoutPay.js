import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function CheckoutPay({ onBack }) {
  const [payment, setPayment] = useState("1");
  return (
    <Grid
      maxW='1000px'
      mx='auto'
      gridTemplateColumns='1fr 1fr'
      gap={{ base: "80px", lg: "200px" }}
    >
      <Box>
        <Box borderRadius='10px' py='8px' px='16px' border='solid 1px #d1d1d1'>
          <InputGroup>
            <Input border='none' placeholder='Contact' />
            <InputRightElement pr='40px'>
              <Button textDecor='underline' variant='unstyled'>
                Change
              </Button>
            </InputRightElement>
          </InputGroup>
          <Divider />
          <InputGroup>
            <Input border='none' placeholder='Ship to' />
            <InputRightElement pr='40px'>
              <Button textDecor='underline' variant='unstyled'>
                Change
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

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
            <Radio value='1'>Cash on Deliver</Radio>
            <Divider />
            <Radio value='2'>Kiss sa noo</Radio>
            <Divider />
            <Radio value='3'>Thank you nalang</Radio>
          </VStack>
        </RadioGroup>

        <Grid mt='24px' gap='40px' gridTemplateColumns='1fr 1fr'>
          <Button borderRadius='20px' p='16px 40px' onClick={onBack}>
            Back
          </Button>
          <Button borderRadius='20px' p='16px 40px'>
            Continue
          </Button>
        </Grid>
      </Box>
      <Box></Box>
    </Grid>
  );
}

export default CheckoutPay;
