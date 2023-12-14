import React from "react"

const ActionButtons = ({
  sortOption,
  filterOption,
  onSortChange,
  onFilterChange,
  onAddProductClick,
}) => {
  return (
    <div className="flex justify-between p-4">
      {/* Child 1: Sort and Filter dropdowns */}
      <div className="flex space-x-4">
        <select
          value={sortOption}
          onChange={onSortChange}
          className="p-2 border rounded"
        >
          {/* Add options for sorting */}
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>

        <select
          value={filterOption}
          onChange={onFilterChange}
          className="p-2 border rounded"
        >
          {/* Add options for filtering */}
          <option value="">Filter By</option>
          <option value="category">Category</option>
          <option value="availability">Availability</option>
        </select>
      </div>

      {/* Child 2: Add Brand and Add Product buttons */}
      <div className="flex space-x-4">
        {/* <button
          onClick={onAddBrandClick}
          className="bg-lime-500 text-white px-4 rounded"
        >
          Add Brand
        </button> */}

        <button
          onClick={onAddProductClick}
          className="bg-blue-800 text-white px-4 rounded"
        >
          Add Product
        </button>
      </div>
    </div>
  )
}

export default ActionButtons
