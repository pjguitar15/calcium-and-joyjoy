import axios from "axios"
import { useEffect, useState } from "react"
export function useGetAccessories() {
  const [accessoriesLoading, setAccessoriesLoading] = useState(false)
  const [accessoriesData, setAccessoriesData] = useState([])
  useEffect(() => {
    setAccessoriesLoading(true)
    axios
      .get(`http://18.223.157.202/backend/api/admin/products`)
      .then((res) => {
        const socksOnly = res.data.filter(
          (item) =>
            item.category?.name === "Accessories" ||
            item.category?.product_category_id === "3"
        )
        setAccessoriesData(socksOnly)
        setAccessoriesLoading(false)
      })
  }, [])

  return { accessoriesData, accessoriesLoading }
}
