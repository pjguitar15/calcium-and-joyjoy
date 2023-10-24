import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Thankyou() {
  return (
    <VStack gap='16px' align='normal'>
      <Heading>THANK YOU!</Heading>

      <Text bgColor='gray.300' p='16px' borderRadius='10px'>
        <CheckCircleIcon
          fontSize='24px'
          color='green.500'
          mr='8px'
          transform='translateY(-2px)'
        />
        Your order is being processed
      </Text>

      <Text>Order number: #######</Text>
      <Text>
        You'll receive a confirmation email shorty. The oder will appear in your
        account as as you've received the email.
      </Text>
      <Text>
        While you wait on your delivery, you can always explore our website.
      </Text>
      <Button
        as={Link}
        to='/'
        w='fit-content'
        px='32px'
        py='16px'
        borderRadius='20px'
      >
        Return to home page
      </Button>
    </VStack>
  );
}

export default Thankyou;
