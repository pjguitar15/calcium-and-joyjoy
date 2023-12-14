import axios from "axios"
import { useEffect, useState } from "react"

const useProductTypes = () => {
  const [productTypes, setProductTypes] = useState([])
  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/product/types`)
      .then((res) => {
        setProductTypes(res.data)
        console.log(res.data)
      })
  }, [])
  return { productTypes, setProductTypes }
}

export default useProductTypes
