import { useState } from "react"
import AddProductForm from "./Form/AddProductForm"
import ProductsDisplay from "./Productlist/ProductsDisplay"

const AdminProductsPage = () => {
  const [isAddingProducts, setIsAddingProducts] = useState(false)
  const handleAddProductClick = () => {
    setIsAddingProducts(true)
  }

  const handleBackToProducts = () => {
    setIsAddingProducts(false)
  }
  return (
    <main className="container mx-auto">
      {isAddingProducts ? (
        <AddProductForm
          handleBackToProducts={handleBackToProducts}
          setIsAddingProducts={setIsAddingProducts}
        />
      ) : (
        <ProductsDisplay handleAddProductClick={handleAddProductClick} />
      )}
    </main>
  )
}

export default AdminProductsPage
