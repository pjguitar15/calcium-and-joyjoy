import axios from "axios"
import { useEffect, useState } from "react"
export function useGetSocks() {
  const [socksLoading, setSocksLoading] = useState(false)
  const [socksData, setSocksData] = useState([])
  useEffect(() => {
    setSocksLoading(true)
    axios
      .get(`http://18.223.157.202/backend/api/admin/products`)
      .then((res) => {
        const socksOnly = res.data.filter(
          (item) =>
            item.category?.name === "Socks" ||
            item.category?.product_category_id === "2"
        )
        setSocksData(socksOnly)
        setSocksLoading(false)
      })
  }, [])

  return { socksData, socksLoading }
}
