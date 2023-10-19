import {
  Box,
  Button,
  Circle,
  Divider,
  Grid,
  HStack,
  Text,
} from "@chakra-ui/react";
import Searchbar from "./Searchbar";
function Navbar() {
  const navItems = ["Men", "Women", "Brand"];
  return (
    <Box>
      <Grid
        gridTemplateColumns='repeat(3,1fr)'
        maxW='var(--maxW)'
        p='16px 56px'
        mx='auto'
        alignItems='center'
      >
        <Box justifySelf='start' bgColor='red' h='80px' aspectRatio='2/1' />
        <Box justifySelf='center'>
          <HStack alignItems='center' gap='40px'>
            {navItems.map((item) => (
              <Button
                fontSize='24px'
                key={item}
                variant='unstyled'
                fontWeight='semibold'
              >
                {item}
              </Button>
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
              bgColor='yellow'
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
