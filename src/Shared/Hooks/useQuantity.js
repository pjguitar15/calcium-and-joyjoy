import { useState } from "react";

export const useQuantity = (initialQuantity = 1, maxQuantity = 10) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const setDirectly = (value) => {
    const val = parseInt(value, 10);
    if (val >= 1 && val <= maxQuantity) {
      setQuantity(val);
    }
  };

  return { quantity, increment, decrement, setDirectly };
};
