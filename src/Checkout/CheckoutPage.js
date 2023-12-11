import CheckoutConfirm from "./CheckoutConfirm"
import { useEffect, useState } from "react"
import CheckoutPay from "./CheckoutPay"
import Thankyou from "./Thankyou"
import { Grid } from "@chakra-ui/react"
import OrderSummary from "./OrderSummary"
function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const [processed, setProcessed] = useState(false)

  const handleConfirm = (data) => {
    setCheckoutData(data)
    setConfirmed(true)
  }

  return (
    <Grid
      maxW="1000px"
      mx="auto"
      gridTemplateColumns={{ base: "1fr", lg: "5.5fr 4.5fr" }}
      gap={{ base: "80px", lg: "200px" }}
    >
      {!confirmed && !processed && (
        <CheckoutConfirm onConfirm={handleConfirm} />
      )}
      {confirmed && !processed && (
        <CheckoutPay
          checkoutData={checkoutData}
          onPay={() => setProcessed(true)}
          onBack={() => setConfirmed(false)}
        />
      )}
      {processed && <Thankyou />}
      <OrderSummary />
    </Grid>
  )
}

export default CheckoutPage
