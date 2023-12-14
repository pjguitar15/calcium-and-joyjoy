import axios from "axios"
import { useEffect, useState } from "react"

const useProductSizes = () => {
  const [productSizes, setProductSizes] = useState([])
  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/product/sizes`)
      .then((res) => {
        console.log(res.data)
        setProductSizes(res.data)
      })
  }, [])
  return { productSizes, setProductSizes }
}

export default useProductSizes
