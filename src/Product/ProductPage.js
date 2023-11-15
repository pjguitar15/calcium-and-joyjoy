import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import YouMightAlsoLike from "../Shared/UI/YouMightAlsoLike";

import AddedToast from "./AddedToast";
import { AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import convertCurrency from "../Shared/utils/convertCurrency";
import config from "../Shared/utils/config";
import { addToCart } from "../Store/cart";

function ProductPage() {
  const { productID } = useParams();
  const [selectedSize, setSelectedSize] = useState(7);
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState("/dummyShoe.png");
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const getShoe = async () => {
    const res = await axiosInstance.get(`/shoes/${productID}`);
    return res.data;
  };
  const { data: shoe, isLoading } = useQuery({
    queryKey: "shoeItem",
    queryFn: getShoe,
  });
  const toast = useToast();
  if (isLoading) return <LoadingSpinner />;

  const { name, gender, description, price, image } = shoe;

  const dummy = [
    "/dummyShoe.png",
    "/airJordan.png",
    "/dummySocks.png",
    "/heroSocks.png",
  ];

  const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];

  const handleQtyChange = (e) => {
    if (e.target.value < 0 || !e.target.value) return setQty(1);
    if (e.target.value > 10) {
      toast({
        title: "Max value is 10",
        status: "warning",
        position: "top",
        isClosable: true,
      });
      return setQty(10);
    }
    setQty(e.target.value);
  };

  const handleAdd = () => {
    dispatch(addToCart(shoe));

    if (showAdded === true) return;
    else {
      setShowAdded(true);
      setTimeout(() => {
        setShowAdded(false);
      }, 1200);
    }
  };

  return (
    <>
      <AnimatePresence>
        {(showAdded || isHovered) && (
          <AddedToast
            item={shoe}
            show={() => setIsHovered(true)}
            dismount={() => setIsHovered(false)}
          />
        )}
      </AnimatePresence>

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
        <Center px='40px' borderRadius='10px' h='100%'>
          <VStack pos='absolute' left='-100px' top='0'>
            {dummy.map((img, i) => (
              <Box
                bgColor='gray.100'
                p='8px'
                borderRadius='10px'
                filter={display === img ? "brightness(.8)" : ""}
                cursor='pointer'
                onClick={() => setDisplay(img)}
                key={i}
              >
                <Image w='64px' h='64px' src={img} />
              </Box>
            ))}
          </VStack>
          <Image maxW='320px' src={`${config.apiUrl}/storage/${image}`} />
        </Center>
        {/* DETAILS AND CTAs */}
        <Box>
          <Box mb='8px' fontWeight='semibold'>
            <Heading fontWeight='semibold' mb='16px'>
              {name}
            </Heading>
            <Text>{gender === "male" ? "Men's" : "Women's"} shoes</Text>
          </Box>
          <Text fontWeight='semibold'>{convertCurrency(price)}</Text>
          <Text my='16px'>Color: Cloud White/ White</Text>
          <Box mb='8px'>
            <InputGroup maxW='160px'>
              <InputLeftAddon
                cursor='pointer'
                children={<MinusIcon />}
                onClick={() =>
                  setQty((prev) => {
                    if (prev === 1) return prev;
                    return prev - 1;
                  })
                }
              />
              <Input
                textAlign='center'
                value={qty}
                type='number'
                onChange={handleQtyChange}
              />
              <InputRightAddon
                cursor='pointer'
                children={<AddIcon />}
                onClick={() =>
                  setQty((prev) => {
                    if (prev >= 10) return prev;
                    return prev + 1;
                  })
                }
              />
            </InputGroup>
          </Box>
          <Box>
            <Text fontWeight='semibold'>Sizes</Text>
            <Grid mt='8px' gap='8px' gridTemplateColumns='repeat(4,1fr)'>
              {sizes.map((size) => (
                <Button
                  key={size}
                  borderRadius='none'
                  border='solid 1px'
                  borderColor={size === selectedSize ? "#daa520" : "black"}
                  color={size === selectedSize ? "#daa520" : "black"}
                  variant='unstyled'
                  _hover={{
                    filter: "brightness(1.1)",
                    opacity: 1,
                  }}
                  fontWeight='normal'
                  px='16px'
                  onClick={() => setSelectedSize(size)}
                  filter={
                    size === selectedSize
                      ? "drop-shadow(0px 2px 4px #daa520)"
                      : ""
                  }
                >
                  US {size}
                </Button>
              ))}
            </Grid>
          </Box>
          <Link to='/shoe/1/customize'>
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
              Customize
            </Button>
          </Link>
          <VStack gap='16px'>
            <HStack gap='16px' w='100%'>
              <Button
                onClick={handleAdd}
                bgColor='gray'
                color='white'
                borderRadius='20px'
                w='100%'
              >
                Add to Cart
              </Button>
              <Button
                border='solid 2px gray'
                bgColor='none'
                color='gray'
                borderRadius='20px'
                w='100%'
              >
                Wishlist
              </Button>
            </HStack>
            <Button
              as={Link}
              to='/checkout'
              bgColor='gray'
              color='white'
              borderRadius='20px'
              w='100%'
            >
              Checkout
            </Button>
          </VStack>
        </Box>
        {/* DESCRIPTION AND REVIEWS */}
        <Box gridColumn='span 2'>
          <Box py='16px' borderBlock='solid 1px #d1d1d1'>
            <Text fontWeight='semibold'>Product Description</Text>
            <Text>{description}</Text>
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel,
                cumque qui amet eos iste non est illo exercitationem sapiente
                vero natus minima necessitatibus fugiat dolores beatae,
                recusandae voluptates quis asperiores!
              </Text>
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* YOU MIGHT ALSO LIKE */}
      {/* <YouMightAlsoLike /> */}
    </>
  );
}

export default ProductPage;
