import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Searchbar() {
  const nav = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    nav(`/products?Type=${searchVal}`);
  };

  return (
    <Box as='form' onSubmit={handleSearch}>
      <InputGroup>
        <Input
          border='none'
          placeholder='Search'
          borderRadius='20px'
          bgColor='gray.200'
          minW='120px'
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <InputLeftElement children={<Search2Icon />} />
      </InputGroup>
    </Box>
  );
}

export default Searchbar;
