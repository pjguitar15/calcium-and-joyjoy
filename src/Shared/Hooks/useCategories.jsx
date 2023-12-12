import axios from "axios"
import { useEffect, useState } from "react"

const useCategories = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/admin/product/categories`)
      .then((res) => {
        setCategories(res.data)
      })
  }, [])
  return { categories }
}

export default useCategories
