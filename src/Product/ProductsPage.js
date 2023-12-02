import { Heading, Grid } from "@chakra-ui/react";
import FilterBar from "./Filter/FilterBar";
import ProductList from "./ProductList";
function ProductsPage() {
  return (
    <>
      <Heading
        justifySelf={{ base: "center", lg: "start" }}
        gridColumn='1/-1'
        textTransform='capitalize'
      >
        Products
      </Heading>
      <Grid gridTemplateColumns='2fr 8fr'>
        <FilterBar />
        <ProductList />
      </Grid>
    </>
  );
}

export default ProductsPage;
