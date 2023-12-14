import axios from "axios"
import { useEffect, useState } from "react"

const useBrands = () => {
  const [brands, setBrands] = useState([])
  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/product/brands`)
      .then((res) => {
        setBrands(res.data)
      })
  }, [])
  return { brands, setBrands }
}

export default useBrands
