import axios from "axios"
import { useEffect, useState } from "react"
export function useGetAllProducts() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://18.223.157.202/backend/api/admin/products`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
  }, [])

  return { data, loading }
}
