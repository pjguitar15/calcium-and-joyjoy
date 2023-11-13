import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <Container textAlign='center' py='80px'>
      <Heading color='red.500'>Error 404</Heading>
      <Text>Page could not be found.</Text>
      <Button mt='32px' as={Link} to='/'>
        Back to home
      </Button>
    </Container>
  );
}

export default ErrorPage;
