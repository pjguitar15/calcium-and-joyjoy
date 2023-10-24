import { Box, Grid } from "@chakra-ui/react";
import OrderSummary from "./OrderSummary";
function Thankyou() {
  return (
    <Grid
      maxW='1000px'
      mx='auto'
      gridTemplateColumns={{ base: "1fr", lg: "5.5fr 4.5fr" }}
      gap={{ base: "80px", lg: "200px" }}
    >
      <Box>SALAMAT HA!!!!!!</Box>
      <OrderSummary />
    </Grid>
  );
}

export default Thankyou;
