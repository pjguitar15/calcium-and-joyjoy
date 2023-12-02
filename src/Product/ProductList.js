import { Box, Grid, Heading } from "@chakra-ui/react";

import ItemCard from "../Shared/UI/ItemCard";
import { useGetShoes } from "../Shared/Hooks/useShoes";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import FilterBar from "./Filter/FilterBar";
import Scrollbars from "rc-scrollbars";

function ProductList() {
  const { data, isLoading } = useGetShoes(["shoes"]);
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Box as={Scrollbars}>
        <Grid
          columnGap='16px'
          rowGap='32px'
          gridTemplateColumns='repeat(auto-fit,minmax(320px,1fr))'
          // overflowY='scroll'
          py='16px'
        >
          {data.map((item) => {
            return <ItemCard data={item} key={item.id} cardW='300px' />;
          })}
        </Grid>
      </Box>
    </>
  );
}

export default ProductList;
