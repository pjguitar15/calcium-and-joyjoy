import { Grid, Heading } from "@chakra-ui/react";

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
    <Grid columnGap='40px' gridTemplateColumns='3fr 7fr'>
      <Heading mb='40px' gridColumn='1/-1' fontWeight='semibold'>
        My Account
      </Heading>
      <Sidebar onSelect={(ui) => setShow(ui)} />
      {handleShow()}
    </Grid>
  );
}

export default AccountPage;
