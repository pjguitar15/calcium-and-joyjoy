import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Heading, Text, VStack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Thankyou() {
  return (
    <VStack gap="24px" align="center" maxW="768px" mx="auto" mt="40px">
      <Heading fontSize="3xl" color="teal.500">THANK YOU!</Heading>
      <Box
        bgColor="gray.100"
        p="24px"
        borderRadius="lg"
        boxShadow="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CheckCircleIcon boxSize="6" color="green.500" mr="2" />
        <Text fontSize="lg" fontWeight="medium">
          Your order is being processed.
        </Text>
      </Box>

      <Text fontSize="md">
        Thanks for your purchase! We hope you enjoy your items. Have a great day!
      </Text>
      <Text fontSize="md">
        While you wait for your delivery, feel free to continue exploring our website.
      </Text>
      <Button
        as={Link}
        to="/"
        colorScheme="teal"
        px="32px"
        py="16px"
        borderRadius="full"
        boxShadow="sm"
        _hover={{ boxShadow: "md" }}
      >
        Return to Home Page
      </Button>
    </VStack>
  );
}

export default Thankyou;