import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
function Searchpage() {
  const { keyword } = useParams();

  return <Box>i am search page</Box>;
}

export default Searchpage;
