import { Container, Grid, Heading } from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import AccountDetails from "./AccountDetails";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import OrderHistory from "./OrderHistory";
import Addresses from "./Addresses";
function AccountPage() {
  const [show, setShow] = useState("Details");

  const handleShow = () => {
    switch (show) {
      case "Details":
        return <AccountDetails />;
      case "Order Details":
        return <OrderDetails />;
      case "Order History":
        return <OrderHistory />;
      case "Delivery Addresses":
        return <Addresses />;
      default:
        return null;
    }
  };

  return (
    <>
      <Heading mb='40px' gridColumn='1/-1' fontWeight='semibold'>
        My Account
      </Heading>
      <Grid
        columnGap='40px'
        gridTemplateColumns='3fr 7fr'
        borderRadius='10px'
        color='white'
        minH='70vh'
        overflow='hidden'
        border='solid 1px black'
      >
        <Sidebar onSelect={(ui) => setShow(ui)} />
        <Container px='24px' py='48px' color='black'>
          {handleShow()}
        </Container>
      </Grid>
    </>
  );
}

export default AccountPage;
