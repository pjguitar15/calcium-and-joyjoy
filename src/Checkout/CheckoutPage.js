import CheckoutConfirm from "./CheckoutConfirm";
import { useState } from "react";
import CheckoutPay from "./CheckoutPay";
function CheckoutPage() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      {!confirmed && <CheckoutConfirm onConfirm={() => setConfirmed(true)} />}
      {confirmed && <CheckoutPay onBack={() => setConfirmed(false)} />}
    </>
  );
}

export default CheckoutPage;
