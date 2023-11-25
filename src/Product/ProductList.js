import { Box, Grid, Heading } from "@chakra-ui/react";

import ItemCard from "../Shared/UI/ItemCard";
import { useGetShoes } from "../Shared/Hooks/useShoes";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import FilterBar from "./Filter/FilterBar";
import Scrollbars from "rc-scrollbars";
function ProductList() {
  const { data, isLoading } = useGetShoes();
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Heading
        justifySelf={{ base: "center", lg: "start" }}
        gridColumn='1/-1'
        textTransform='capitalize'
      >
        Products
      </Heading>
      <Grid
        gridTemplateColumns='240px 1fr'
        pt='40px'
        pb='80px'
        columnGap='80px'
      >
        <FilterBar />

        <Box Box as={Scrollbars} h='90vh'>
          <Grid
            columnGap='16px'
            rowGap='32px'
            gridTemplateColumns='repeat(auto-fit,minmax(320px,1fr))'
            // overflowY='scroll'
            py='16px'
          >
            {data.map((item) => {
              return (
                <Box>
                  <ItemCard data={item} key={item.id} cardW='300px' />
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default ProductList;
