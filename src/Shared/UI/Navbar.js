import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Image,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import Searchbar from "../../Search/Searchbar";
import { Link } from "react-router-dom";
import CartPopOver from "../../Cart/CartPopover";
import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "react-query";
function Navbar() {
  const navItems = [
    {
      text: "Products",
      page: "products",
    },
    {
      text: "About us",
      page: "about",
    },
    {
      text: "Mix & Match",
      page: "/customize",
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"));
  const getDynamics = async () => {
    const res = await axiosInstance.get(`/admin/general-settings`);
    return res.data;
  };

  const { data: dynamics } = useQuery({
    queryKey: "dynamicItems",
    queryFn: getDynamics,
  });

  console.log(dynamics);
  return (
    <Box
      pos='sticky'
      // pos='fixed'
      top='0px'
      backdropFilter='auto'
      backdropBlur='8px'
      zIndex={100}
    >
      <Grid
        gridTemplateColumns='1fr 2fr 1fr'
        maxW='var(--maxW)'
        mx='auto'
        alignItems='center'
      >
        <Link to='/'>
          <Image
            transform='translateY(20px)'
            h='80px'
            w='256px'
            src='/assets/logoheader.png'
            //src={dynamics.logo}
          />
        </Link>
        <Box justifySelf='center'>
          <HStack transform='translateX(-24px)' alignItems='center' gap='40px'>
            {navItems.map((item) => (
              <Button
                key={item.text}
                display='block'
                as={Link}
                to={item.page}
                variant='unstyled'
                _hover={{
                  textDecor: "underline",
                  textUnderlineOffset: "8px",
                }}
                _active={{
                  textDecor: "underline",
                  textUnderlineOffset: "8px",
                }}
                fontWeight='semibold'
                fontSize='20px'
              >
                {item.text}
              </Button>
            ))}
          </HStack>
        </Box>
        <HStack justifySelf='end' pr='24px'>
          <Searchbar />
          <Divider mx='8px' orientation='vertical' height='40px' />
          {!user ? (
            <Link to='/auth/sign-in'>
              <Button variant='unstyled' borderRadius={0}>
                Sign In
              </Button>
            </Link>
          ) : (
            <Link to='/me'>
              <Button variant='unstyled' borderRadius={0}>
                {user.user_info.firstname}
              </Button>
            </Link>
          )}
          <Divider mx='8px' orientation='vertical' height='40px' />
          <Box>
            <CartPopOver />
          </Box>
          <Divider ml='24px' mr='8px' orientation='vertical' height='40px' />
          <Link to='/wishlist'>
            <Icon as={AiOutlineHeart} cursor='pointer' />
          </Link>
        </HStack>
      </Grid>
    </Box>
  );
}

export default Navbar;
