import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useShoeData = (productID) => {
  const [shoe, setShoe] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await axiosInstance.get(`/shoes/${productID}`);
        setShoe(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShoe();
  }, [productID]);

  return { shoe, isLoading, error };
};
