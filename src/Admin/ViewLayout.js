import { Box } from "@chakra-ui/react";
function ViewLayout({ children }) {
  return (
    <Box border='solid 2px #d1d1d1' borderRadius='10px' p='40px 24px'>
      {children}
    </Box>
  );
}

export default ViewLayout;
