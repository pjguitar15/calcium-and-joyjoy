import { Box, Grid } from "@chakra-ui/react";
import FilterBar from "../Product/Filter/FilterBar";
import CustomizeRes from "./CustomizeRes";
import Carousels from "./Carousels";
import { useEffect, useState } from "react";

function CustomizePage() {
  const [results, setResults] = useState({});
  const [filters, setFilters] = useState({});

  const handleSelectItems = (item) => {
    setResults(item);
  };

  const handleFilterChange = (filterGroup, filterItem) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterGroup]: filterItem }));
  };

  return (
    <Grid gridTemplateColumns='2fr 8fr' columnGap='40px'>
      <FilterBar onFilterChange={handleFilterChange} />
      <Box>
        <CustomizeRes results={results} />
        <Carousels onSelectItems={handleSelectItems} filters={filters} />
      </Box>
    </Grid>
  );
}

export default CustomizePage;
