import { Box, VStack, Divider, Button } from "@chakra-ui/react";
import { useState } from "react";

import LogoutModal from "./LogoutModal";

const detailItems = [
  "Details",
  "Order Details",
  "Order History",
  "Delivery Addresses",
];

function Sidebar({ onSelect }) {
  const [selected, setSelected] = useState("Details");

  const handleSelect = (ui) => {
    setSelected(ui);
    onSelect(ui);
  };

  return (
    <Box py='48px' bgColor='blackAlpha.500' pos='relative'>
      <VStack gap='32px' align='start' justify='center'>
        {detailItems.map((item) => (
          <Box
            // borderBottom={selected === item ? "solid 1px black" : ""}
            key={item}
            w='100%'
            pl='40px'
            py='16px'
            pos='relative'
            role='group'
            cursor='pointer'
            color={'white'}
            bgColor={selected === item ? "blackAlpha.600" : ""}
            onClick={() => handleSelect(item)}
            _hover={{
              color: "blackAlpha.600",
            }}
          >
            <Button fontSize='24px' variant='unstyled' fontWeight='normal'>
              {item}
            </Button>
          </Box>
        ))}
        <Box pl='40px'>
          <LogoutModal />
        </Box>
      </VStack>
      <Divider
        pos='absolute'
        right='0'
        top='0'
        orientation='vertical'
        borderColor='black'
      />
    </Box>
  );
}

export default Sidebar;
