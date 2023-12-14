import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { useMutation, useQuery } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import convertCurrency from "../Shared/utils/convertCurrency";
import config from "../Shared/utils/config";
import { addToCart } from "../Store/cart";

function ItemPage() {
  const { productID } = useParams();
  const [selectedSize, setSelectedSize] = useState(7);
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [display, setDisplay] = useState("/dummyShoe.png");
  const toast = useToast();
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

  console.log(shoe)

  if (isLoading) return <LoadingSpinner />;

  const user = JSON.parse(localStorage.getItem("user"));

  const handleWish = async () => {
    if (!user)
      return toast({
        position: "top",
        status: "error",
        description: "Login to add a wishlist",
      });

    toast({ position: "top", status: "success", title: "Added to wishlist" });
    const res = await axiosInstance.post(
      "/user/wishlist/store",
      { user_id: user.user_info.id, product_id: productID },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

  };

  const { name, gender, description, price, image, colors } = shoe;

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
    dispatch(
      addToCart({
        ...shoe,
        quantity: qty,
        price: price * qty,
        size: selectedSize,
      })
    );
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
            item={{ ...shoe, quantity: qty, size: selectedSize }}
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
        <HStack
          px='40px'
          borderRadius='10px'
          h='100%'
          alignItems='start'
          justify='center'
        >
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

          <Image
            mt='40px'
            maxW='320px'
            src={image}
          />
        </HStack>
        {/* DETAILS AND CTAs */}
        <Box>
          <Box mb='8px' fontWeight='semibold'>
            <Heading fontWeight='semibold' mb='16px'>
              {name}
            </Heading>
            <Text>{gender === "male" ? "Men's" : "Women's"} shoes</Text>
          </Box>
          <Text fontWeight='semibold'>{convertCurrency(price)}</Text>
          <Text my='16px'>Colors: {colors.map((color, index, array) => (
            index === array.length - 1 ? color.color.name : color.color.name + ", "
          ))}</Text>
          <Box mb='8px'>
            <HStack gap='24px'>
              <Text fontWeight='semibold' role='label'>
                Quantity:
              </Text>
              <InputGroup maxW='140px'>
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
            </HStack>
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
                  borderWidth={size === selectedSize ? "2px" : "1px"}
                  color={size === selectedSize ? "#daa520" : "black"}
                  variant='unstyled'
                  fontWeight='normal'
                  px='16px'
                  onClick={() => setSelectedSize(size)}
                >
                  US {size}
                </Button>
              ))}
            </Grid>
          </Box>
          <VStack mt='32px' gap='16px'>
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
                onClick={handleWish}
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

export default ItemPage;
