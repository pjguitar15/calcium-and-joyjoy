import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
function ProductPage() {
  const [display, setDisplay] = useState("/dummyShoe.png");
  const dummy = [
    "/dummyShoe.png",
    "/airJordan.png",
    "/dummySocks.png",
    "/heroSocks.png",
  ];

  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

  return (
    <Box>
      <Grid
        justifyContent='center'
        pr='40px'
        alignItems='center'
        gridTemplateColumns='1.2fr 1fr'
        gap='80px'
      >
        <Grid
          gap='24px'
          gridTemplateColumns='1fr 1fr'
          h='100%'
          justifySelf='end'
        >
          <VStack justifySelf='end'>
            {dummy.map((img) => (
              <Box
                bgColor='gray.100'
                p='8px'
                borderRadius='10px'
                filter={display === img ? "brightness(.8)" : ""}
                cursor='pointer'
                onClick={() => setDisplay(img)}
              >
                <Image w='100px' h='100px' src={img} />
              </Box>
            ))}
          </VStack>
          <Center px='40px' borderRadius='10px' h='100%'>
            <Image maxW='320px' src={display} />
          </Center>
        </Grid>
        <Box justifySelf='start'>
          <Box mb='16px' fontWeight='semibold'>
            <Heading fontWeight='semibold'>Air Force 1 White</Heading>
            <Text>Men/Women's Shoes</Text>
          </Box>
          <Text fontWeight='semibold'>&#8369;5,495</Text>
          <Text my='24px'>Color: Cloud White/ White</Text>
          <Box>
            <Text fontWeight='semibold'>Sizes</Text>
            <Grid mt='8px' gap='8px' gridTemplateColumns='repeat(4,1fr)'>
              {sizes.map((size) => (
                <Button
                  borderRadius='none'
                  border='solid 1px gray'
                  variant='unstyled'
                  _hover={{
                    filter: "brightness(1.1)",
                  }}
                  fontWeight='normal'
                  px='16px'
                >
                  US {size}
                </Button>
              ))}
            </Grid>
          </Box>
          <Button
            color='goldenrod'
            variant='unstyled'
            border='solid 1px goldenrod'
            mt='24px'
            w='100%'
            mb='24px'
            _hover={{
              bgColor: "goldenrod",
              color: "white",
            }}
          >
            Cutomize
          </Button>
          <VStack gap='16px'>
            <Button bgColor='gray' color='white' borderRadius='20px' w='100%'>
              Add to Cart
            </Button>
            <Button bgColor='gray' color='white' borderRadius='20px' w='100%'>
              Checkout
            </Button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}

export default ProductPage;
