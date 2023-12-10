import React, { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import axios from "axios"

const Products = () => {
  const [shoesData, setShoesData] = useState([])
  useEffect(() => {
    axios.get("http://18.223.157.202/backend/api/shoes").then((res) => {
      setShoesData(res.data)
    })
  }, [])

  return (
    <main className="grid lg:grid-cols-3 xl:grid-cols-4  p-4 gap-4">
      {shoesData.map((item, index) => (
        <ProductItem key={index} item={item} />
      ))}
    </main>
  )
}

export default Products
