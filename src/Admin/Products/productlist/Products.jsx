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

  const removeItemFromData = (id) => {
    const updatedData = shoesData.filter((item) => item.id !== id)
    setShoesData(updatedData)
  }
  return (
    <main className="grid lg:grid-cols-3 xl:grid-cols-4  p-4 gap-4">
      {shoesData
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((item, index) => (
          <ProductItem
            key={index}
            item={item}
            removeItemFromData={removeItemFromData}
          />
        ))}
    </main>
  )
}

export default Products
