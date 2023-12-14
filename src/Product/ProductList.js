import { Box, Grid } from "@chakra-ui/react";
import ItemCard from "../Shared/UI/ItemCard";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import Scrollbars from "rc-scrollbars";
import { useSearchParams } from "react-router-dom";
import { useGetAllProducts } from '../Shared/Hooks/useGetAllProducts';
import { useGetShoes } from '../Shared/Hooks/useShoes';

function ProductList() {
  const [searchParams] = useSearchParams();

  const queryObj = {};
  for (const [key, value] of searchParams.entries()) {
    queryObj[key] = value;
  }

  const keyword = queryObj.keyword;

  const { data, isLoading } = useGetShoes();
  if (isLoading) return <LoadingSpinner />;

  const filteredData = keyword
    ? data.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    : data;

  return (
    <Box as={Scrollbars}>
      <Grid
        columnGap='16px'
        rowGap='32px'
        gridTemplateColumns='repeat(auto-fit,minmax(320px,1fr))'
        py='16px'
      >
        {data.map((item) => (
          <ItemCard data={item} key={item.id} cardW='300px' />
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
