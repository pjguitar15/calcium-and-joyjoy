import { useSelector } from "react-redux";

export default function useTotal() {
  const cart = useSelector((state) => state.cart);
}
