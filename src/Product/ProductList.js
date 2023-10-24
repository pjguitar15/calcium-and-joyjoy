import { Box, Grid, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ItemCard from "../Shared/ItemCard";
function ProductList() {
  const { category, brand } = useParams();
  const dummyProds = Array.from({ length: 8 });
  return (
    <Box pt='40px' pb='80px'>
      <Grid
        columnGapgap='24px'
        rowGap='48px'
        gridTemplateColumns='repeat(auto-fit,minmax(357px,1fr))'
      >
        <Heading
          justifySelf={{ base: "center", lg: "start" }}
          ml={{ base: "0px", lg: "72px" }}
          gridColumn='1/-1'
          textTransform='capitalize'
        >
          {category ? `${category}'s ${brand}` : brand} (8)
        </Heading>
        {dummyProds.map((_, i) => {
          return (
            <ItemCard
              cardW='300px'
              title={`Abbibas ${i}`}
              img='/dummyShoe.png'
              key={i}
            />
          );
        })}
      </Grid>
    </Box>
  );
}

export default ProductList;
