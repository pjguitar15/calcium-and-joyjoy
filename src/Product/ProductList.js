import { Box, Grid, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ItemCard from "../Shared/UI/ItemCard";
import { useGetShoes } from "../Shared/Hooks/useShoes";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
function ProductList() {
  const { gender, variant } = useParams();
  const sex = gender === "Men" ? "male" : "female";
  const { data, isLoading } = useGetShoes();
  if (isLoading) return <LoadingSpinner />;

  const filteredData = data.filter((item) => item.gender === sex);

  return (
    <Box pt='40px' pb='80px'>
      <Grid
        columnGap='24px'
        rowGap='48px'
        gridTemplateColumns='repeat(auto-fit,minmax(357px,1fr))'
      >
        <Heading
          justifySelf={{ base: "center", lg: "start" }}
          ml={{ base: "0px", lg: "72px" }}
          gridColumn='1/-1'
          textTransform='capitalize'
        >
          {variant === "shoes" ? `${gender}'s shoes` : "Accessories"}
        </Heading>
        {filteredData.map((item, i) => {
          return <ItemCard data={item} key={item.id} cardW='300px' />;
        })}
      </Grid>
    </Box>
  );
}

export default ProductList;
