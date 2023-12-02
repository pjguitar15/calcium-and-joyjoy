import { Box, Grid } from "@chakra-ui/react";

import FilterBar from "../Product/Filter/FilterBar";
import CustomizeRes from "./CustomizeRes";
import Carousels from "./Carousels";
function CustomizePage() {
  return (
    <Grid gridTemplateColumns='2fr 8fr'>
      <FilterBar />
      <Box>
        <CustomizeRes />
        <Carousels />
      </Box>
    </Grid>
  );
}

export default CustomizePage;
