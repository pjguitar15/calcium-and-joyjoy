import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProductList from "../Product/ProductList";

function Searchpage() {
  const { keyword } = useParams();

  return <Box><ProductList keyword={keyword} /></Box>;
}


export default Searchpage;
