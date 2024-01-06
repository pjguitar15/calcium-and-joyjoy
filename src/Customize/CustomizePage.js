import { Box, Grid } from "@chakra-ui/react";
import FilterBar from "../Product/Filter/FilterBar";
import CustomizeRes from "./CustomizeRes";
import Carousels from "./Carousels";
import { useState } from "react";
function CustomizePage() {
  const [results, setResults] = useState({});
  const handleSelectItems = (item) => {
    setResults(item);
  };

  return (
    <Grid gridTemplateColumns='2fr 8fr' columnGap='40px'>
      <FilterBar />
      <Box>
        <CustomizeRes results={results} />
        <Carousels onSelectItems={handleSelectItems} />
      </Box>
    </Grid>
  );
}

export default CustomizePage;
