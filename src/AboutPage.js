import { Box, Container, Heading, Image, Text } from "@chakra-ui/react";
function AboutPage() {
  return (
    <Box bgColor='#413F3FFA'>
      <Container
        textAlign='center'
        maxW='768px'
        bg={`url('/assets/BigLogo.svg')`}
        color='var(--accent)'
        py='80px'
      >
        <Heading mb='24px'>Mission</Heading>
        <Text>
          Our mission at Calcium Joyjoy Online Shop is to provide shoe
          enthusiasts and fashion-forward consumers with a curated and limited
          selection of premium branded shoes and accessories that embody style,
          quality, and exclusivity. We aim to be the go-to destination for those
          seeking the latest trends and timeless classics in the world of
          footwear, offering a seamless online shopping experience that exceeds
          expectations.
        </Text>
        <Heading mt='40px' mb='24px'>
          Vision
        </Heading>
        <Text>
          The vision of Calcium Joyjoy Online Shop is to completely transform
          the way individuals shop for and purchase branded shoes and
          accessories online. Our tagline, "You want, I get, You love," serves
          as our guide by providing a customized and outstanding shopping
          experience, we hope to become a top destination for shoe enthusiasts.
        </Text>
        <Image src='/assets/dti.jpg' mt='24px' maxH='560px' mx='auto' />
      </Container>
    </Box>
  );
}

export default AboutPage;
