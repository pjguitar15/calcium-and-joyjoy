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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  textDecoration,
} from "@chakra-ui/react";
import Searchbar from "./Searchbar";
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
        <Box justifySelf='start' bgColor='red' h='80px' aspectRatio='2/1' />
        <Box justifySelf='center'>
          <HStack alignItems='center' gap='40px'>
            {navItems.map((item) => (
              <Menu key={item}>
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
                  <MenuItem fontWeight='semibold'>Nike</MenuItem>
                  <MenuDivider />
                  <MenuItem fontWeight='semibold'>Jordan</MenuItem>
                  <MenuDivider />
                  <MenuItem fontWeight='semibold'>Addidas</MenuItem>
                </MenuList>
              </Menu>
            ))}
          </HStack>
        </Box>
        <HStack justifySelf='end' pr='24px'>
          <Searchbar />
          <Divider mx='8px' orientation='vertical' height='40px' />
          <Button variant='unstyled' borderRadius={0}>
            Sign In
          </Button>
          <Divider mx='8px' orientation='vertical' height='40px' />
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
        </HStack>
      </Grid>
    </Box>
  );
}

export default Navbar;
