import axios from "axios";
import { useEffect, useState } from "react";

export function useGetRecommendedProducts() {
  const [recommendedLoading, setRecommendedLoading] = useState(false)
  const [recommendedData, setRecommendedData] = useState([])

  useEffect(() => {
    setRecommendedLoading(true)
    axios
      .get(`http://18.223.157.202/backend/api/recommended_products`)
      .then((res) => {
        setRecommendedData(res.data.most_sold_products) // extract the most_sold_products array
        setRecommendedLoading(false)
      })
  }, [])

  return { recommendedData, recommendedLoading }
}
