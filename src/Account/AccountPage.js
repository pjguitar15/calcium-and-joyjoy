import { Container, Grid, Heading } from "@chakra-ui/react";

import Sidebar from "./Sidebar";
import AccountDetails from "./AccountDetails";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
function AccountPage() {
  const [show, setShow] = useState("Details");

  const handleShow = () => {
    if (show === "Details") return <AccountDetails />;
    if (show === "Order Details") return <OrderDetails />;
  };

  return (
    <>
      <Heading mb='40px' gridColumn='1/-1' fontWeight='semibold'>
        My Account
      </Heading>
      <Grid
        px='24px'
        py='48px'
        columnGap='40px'
        gridTemplateColumns='3fr 7fr'
        borderRadius='10px'
        color='white'
        bgColor='blackAlpha.600'
      >
        <Sidebar onSelect={(ui) => setShow(ui)} />
        <Container color='black' px='32px'>
          {handleShow()}
        </Container>
      </Grid>
    </>
  );
}

export default AccountPage;
