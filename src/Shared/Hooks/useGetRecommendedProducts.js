import axios from "axios";
import { useEffect, useState } from "react";

export function useGetRecommendedProducts() {
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [recommendedData, setRecommendedData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setRecommendedLoading(true);
    axios
      .get(`http://18.223.157.202/backend/api/recommended_products`)
      .then((res) => {
        // Directly setting the recommended products data as received
        setRecommendedData(res.data);
        setRecommendedLoading(false);
      })
      .catch((error) => {
        // Detailed error handling
        setError("Failed to fetch recommended products. Please try again later.");
        console.error("Error fetching recommended products:", error);
        setRecommendedLoading(false);
      });
  }, []);

  return { recommendedData, recommendedLoading, error };
}
