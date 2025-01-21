import { useState } from "react";
import { type UseQuantityProps } from "../types";

const useQuantity = ({ stock }: UseQuantityProps) => {
  //
  ////DATA
  const [quantity, setQuantity] = useState(1);

  ////LOGIC
  const handleQuantityIncrement = () => {
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  };
  const handleQuantityDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return {
    quantity,
    setQuantity,
    handleQuantityIncrement,
    handleQuantityDecrement,
  };
};

export default useQuantity;
