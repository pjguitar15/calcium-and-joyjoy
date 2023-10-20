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
} from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
function Navbar() {
  const navItems = ["Men", "Women", "Brand"];
  return (
    <Box
      pos='sticky'
      top='0px'
      backdropFilter='auto'
      backdropBlur='8px'
      zIndex={100}
    >
      <Grid
        gridTemplateColumns='repeat(3,1fr)'
        maxW='var(--maxW)'
        px='56px'
        mx='auto'
        alignItems='center'
      >
        <Link to='/'>
          <Box justifySelf='start' bgColor='red' h='80px' aspectRatio='2/1' />
        </Link>
        <Box justifySelf='center'>
          <HStack alignItems='center' gap='40px'>
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
                  <MenuItem justifyContent='center' fontWeight='semibold'>
                    Nike
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem justifyContent='center' fontWeight='semibold'>
                    Jordan
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem justifyContent='center' fontWeight='semibold'>
                    Addidas
                  </MenuItem>
                </MenuList>
              </Menu>
            ))}
          </HStack>
        </Box>
        <HStack justifySelf='end' pr='24px'>
          <Searchbar />
          <Divider mx='8px' orientation='vertical' height='40px' />
          <Link to='/auth'>
            <Button variant='unstyled' borderRadius={0}>
              Sign In
            </Button>
          </Link>
          <Divider mx='8px' orientation='vertical' height='40px' />
          <Link to='/cart'>
            <Button variant='unstyled' pos='relative'>
              Cart
              <Circle
                size='20px'
                bgColor='goldenrod'
                aspectRatio='1/1'
                pos='absolute'
                top='4px'
                right='-16px'
              >
                <Text fontWeight='semibold' fontSize='12px' lineHeight='0'>
                  0
                </Text>
              </Circle>
            </Button>
          </Link>
        </HStack>
      </Grid>
    </Box>
  );
}

export default Navbar;
