import {
  Box,
  Button,
  Circle,
  Divider,
  Grid,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import CartPopOver from "../Cart/CartPopover";
function Navbar() {
  const navItems = ["Men", "Women", "Brand"];
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
          />
        </Link>
        <Box justifySelf='center'>
          <HStack transform='translateX(-24px)' alignItems='center' gap='40px'>
            {navItems.map((item) => (
              <Menu offset={item === "Men" ? [-90, 16] : [-75, 16]} key={item}>
                <MenuButton
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
                  {item}
                </MenuButton>
                <MenuList>
                  <Link
                    to={
                      item !== "Brand" ? `/browse/nike/${item}` : `/browse/nike`
                    }
                  >
                    <MenuItem justifyContent='center' fontWeight='semibold'>
                      Nike
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link
                    to={
                      item !== "Brand"
                        ? `/browse/jordan/${item}`
                        : `/browse/Jordan`
                    }
                  >
                    <MenuItem justifyContent='center' fontWeight='semibold'>
                      Jordan
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link
                    to={
                      item !== "Brand"
                        ? `/browse/addiddas/${item}`
                        : `/browse/addiddas`
                    }
                  >
                    <MenuItem justifyContent='center' fontWeight='semibold'>
                      Addidas
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            ))}
          </HStack>
        </Box>
        <HStack justifySelf='end' pr='24px'>
          <Searchbar />
          <Divider mx='8px' orientation='vertical' height='40px' />
          <Link to='/auth/register'>
            <Button variant='unstyled' borderRadius={0}>
              Sign In
            </Button>
          </Link>
          <Divider mx='8px' orientation='vertical' height='40px' />
          <CartPopOver />
        </HStack>
      </Grid>
    </Box>
  );
}

export default Navbar;
