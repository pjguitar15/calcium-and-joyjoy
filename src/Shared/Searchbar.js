import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
function Searchbar() {
  return (
    <Box>
      <InputGroup>
        <Input
          border='none'
          placeholder='Search'
          borderRadius='20px'
          bgColor='gray.200'
          minW='120px'
        />
        <InputLeftElement children={<Search2Icon />} />
      </InputGroup>
    </Box>
  );
}

export default Searchbar;
