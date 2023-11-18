import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Center,
} from "@chakra-ui/react";
function Joypop() {
  return (
    <Popover>
      <PopoverTrigger>
        <Center
          zIndex={99}
          cursor='pointer'
          w='80px'
          aspectRatio='1/1'
          bgColor='#DE5050'
          borderRadius='full'
          pos='fixed'
          bottom='24px'
          right='16px'
          fontSize='40px'
          fontWeight='extrabold'
          color='#F8EB26'
          textShadow='0 2px 4px black'
          css={{
            WebkitTextStroke: "4px black",
          }}
          border='solid 2px black'
        >
          J
        </Center>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Box>Wus happenin?</Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default Joypop;
