import CheckoutConfirm from "./CheckoutConfirm";
import { useState } from "react";
import CheckoutPay from "./CheckoutPay";
import Thankyou from "./Thankyou";
function CheckoutPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [processed, setProcessed] = useState(false);

  return (
    <>
      {!confirmed && !processed && (
        <CheckoutConfirm onConfirm={() => setConfirmed(true)} />
      )}
      {confirmed && !processed && (
        <CheckoutPay
          onPay={() => setProcessed(true)}
          onBack={() => setConfirmed(false)}
        />
      )}
      {processed && <Thankyou />}
    </>
  );
}

export default CheckoutPage;
