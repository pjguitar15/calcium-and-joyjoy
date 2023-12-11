import React, { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import ActionButtons from "./ActionButtons"
import Products from "./Products"

const ProductsDisplay = ({ handleAddProductClick }) => {
  const [sortOption, setSortOption] = useState("") // State for sorting dropdown
  const [filterOption, setFilterOption] = useState("") // State for filtering dropdown

  const handleSortChange = (event) => {
    setSortOption(event.target.value)
    // Add sorting logic or dispatch an action if needed
  }

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value)
    // Add filtering logic or dispatch an action if needed
  }

  const handleAddBrandClick = () => {
    // Add logic for the "Add Brand" button click
  }
  return (
    <div>
      <h3 className="text-xl font-semibold">
        Products Management | <span className="text-gray-500">Products</span>
      </h3>

      <div className="border border-gray-300 rounded p-5 mt-6">
        {/* Title and Search */}
        <div className="flex justify-between mb-5">
          <h3 className="text-2xl font-semibold">Product List</h3>
          <div className="relative xl:w-1/5 ms-auto me-0">
            <input
              className="bg-gray-200 py-2 ps-9 w-full rounded-xl"
              type="text"
              placeholder="Search"
            />
            <FaSearch className="absolute top-3 left-3" />
          </div>
        </div>
        {/* Action buttons */}
        <ActionButtons
          sortOption={sortOption}
          filterOption={filterOption}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          onAddBrandClick={handleAddBrandClick}
          onAddProductClick={handleAddProductClick}
        />

        {/* Products */}
        <Products />
      </div>
    </div>
  )
}

export default ProductsDisplay
