import { useSelector } from "react-redux";

export default function useSubtotal() {
  const cart = useSelector((state) => state.cart);

  const subTotal = cart.reduce((acc, cur) => acc + cur.price, 0);

  return subTotal;
}
