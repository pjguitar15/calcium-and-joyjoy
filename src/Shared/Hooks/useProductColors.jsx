import axios from "axios"
import { useEffect, useState } from "react"

const useProductColors = () => {
  const [productColors, setProductColors] = useState([])
  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/product/colors`)
      .then((res) => {
        setProductColors(res.data)
      })
  }, [])
  return { productColors }
}

export default useProductColors
