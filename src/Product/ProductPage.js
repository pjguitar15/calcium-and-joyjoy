import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import ItemCard from "../Shared/ItemCard";
import YouMightAlsoLike from "../Shared/YouMightAlsoLike";
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
    <>
      <Grid
        justifyContent='center'
        pr='40px'
        alignItems='center'
        gridTemplateColumns='1.3fr 1fr'
        gap='80px'
        maxW='1100px'
        mx='auto'
        pos='relative'
      >
        {/* DISPLAYED PRODUCT */}
        <Center bgColor='gray.100' px='40px' borderRadius='10px' h='100%'>
          <VStack pos='absolute' left='-100px' top='0'>
            {dummy.map((img) => (
              <Box
                bgColor='gray.100'
                p='8px'
                borderRadius='10px'
                filter={display === img ? "brightness(.8)" : ""}
                cursor='pointer'
                onClick={() => setDisplay(img)}
              >
                <Image w='64px' h='64px' src={img} />
              </Box>
            ))}
          </VStack>
          <Image maxW='320px' src={display} />
        </Center>

        {/* DETAILS AND CTAs */}
        <Box>
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

        {/* DESCRIPTION AND REVIEWS */}
        <Box gridColumn='span 2'>
          <Box py='16px' borderBlock='solid 1px #d1d1d1'>
            <Text fontWeight='semibold'>Product Description</Text>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
              laboriosam expedita tenetur libero porro. Architecto dignissimos
              illum nesciunt neque quia qui ratione itaque animi odit. Officia
              pariatur natus accusamus blanditiis?
            </Text>
          </Box>
          <Box py='16px'>
            <HStack alignItems='center' gap='40px'>
              <Text fontWeight='semibold'>{`Reviews (1)`}</Text>
              <Box color='goldenrod'>
                <StarIcon mr='8px' transform='translateY(-2px)' />
                5.0
              </Box>
            </HStack>
            <Box fontSize='15px' mt='24px' color='gray.500'>
              <HStack aligntems='center' gap='40px'>
                <Box color='goldenrod'>
                  <StarIcon mr='8px' transform='translateY(-2px)' />
                  5.0
                </Box>
                <Text>Jon V.- 10 July 2023</Text>
              </HStack>
              <Text mt='8px'>
                The Air Force 1 react shoes are definitely not stanky. I'd wear
                these anywhere especially while swimming. I also love sting
                energy drink.
              </Text>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* YOU MIGHT ALSO LIKE */}
      <YouMightAlsoLike />
    </>
  );
}

export default ProductPage;
