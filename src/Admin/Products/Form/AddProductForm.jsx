import React, { useState } from "react"
import { IoClose } from "react-icons/io5"
import { FaCaretDown } from "react-icons/fa"
import config from "../../../Shared/utils/config"

const AddProductForm = ({ handleBackToProducts }) => {
  const [selectedProductType, setSelectedProductType] = useState("")
  const [mainImage, setMainImage] = useState(null)

  const handleMainImageChange = (event) => {
    const file = event.target.files[0]
    // You can use the 'file' variable for further processing or display a preview
    setMainImage(file)
  }

  // Handler for updating the selected product type
  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value)
  }

  const handleFormSubmit = () => {
    const baseUrl = config.apiUrl
    // http://18.223.157.202/backend/api/admin/products/store
    /* 
      Payload

    */
    console.log(baseUrl)
  }
  return (
    <div>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Product Form</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="inStock"
                  className="mr-1"
                  defaultChecked
                />
                In Stock
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="outOfStock"
                  className="mr-1"
                />
                Out of Stock
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="men"
                  className="mr-1"
                />
                Men
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="women"
                  className="mr-1"
                />
                Women
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="unisex"
                  className="mr-1"
                  defaultChecked
                />
                Unisex
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="productCategory"
              className="block text-sm font-medium text-gray-600"
            >
              Product Category
            </label>
            <select
              id="productCategory"
              name="productCategory"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="types"
              className="block text-sm font-medium text-gray-600"
            >
              Types
            </label>
            <select
              id="types"
              name="types"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="colors"
              className="block text-sm font-medium text-gray-600"
            >
              Colors
            </label>
            <select
              id="colors"
              name="colors"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            >
              <option value="One">One</option>
              <option value="Two">Two</option>
              <option value="Three">Three</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="productImages"
              className="block text-sm font-medium text-gray-600"
            >
              Product Images
            </label>
            <input
              type="file"
              id="productImages"
              name="productImages"
              accept="image/jpeg, image/png"
              multiple
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm
