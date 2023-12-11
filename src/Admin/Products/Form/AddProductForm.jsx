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
      <div className="flex justify-between mb-10">
        <h1 className="text-2xl font-bold">ADD PRODUCT</h1>
        <IoClose
          onClick={handleBackToProducts}
          className="text-3xl cursor-pointer"
        />
      </div>
      <div className="relative inline-block text-left">
        <select
          value={selectedProductType}
          onChange={handleProductTypeChange}
          className="block appearance-none w-full bg-blue-500 text-white py-2 px-4 pr-8 rounded-md shadow-sm leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 font-semibold"
        >
          <option className="bg-white" value="" disabled>
            Select Product Type
          </option>
          <option className="bg-white text-black" value="lifestyle">
            Lifestyle
          </option>
          <option className="bg-white text-black" value="running">
            Running
          </option>
          <option className="bg-white text-black" value="basketball">
            Basketball
          </option>
          <option className="bg-white text-black" value="training">
            Training
          </option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FaCaretDown className="text-white" />
        </div>
      </div>

      <div className="border border-gray-500 rounded mt-7">
        <div className="px-4 py-2 border-b border-gray-500 bg-gray-200">
          <h6 className="font-semibold text-lg">Basic Information</h6>
        </div>
        <div className="px-4 pt-2 pb-3 flex gap-6">
          <div className="flex-1">
            <h6 className="font-semibold text-md">Name</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter name"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Description</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter description"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Price</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter price"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Type</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter type"
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-500 rounded mt-7">
        <div className="px-4 py-2 border-b border-gray-500 bg-gray-200">
          <h6 className="font-semibold text-lg">Additional Information</h6>
        </div>
        <div className="px-4 pt-2 pb-3 flex gap-6">
          <div className="flex-1">
            <h6 className="font-semibold text-md">Status</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter status"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Gender</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter gender"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Brand name</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter brand name"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Main Image</h6>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-500 rounded mt-7">
        <div className="px-4 py-2 border-b border-gray-500 bg-gray-200">
          <h6 className="font-semibold text-lg">Product Variants</h6>
        </div>
        <div className="px-4 pt-2 pb-3 flex gap-6">
          <div className="flex-1">
            <h6 className="font-semibold text-md">Color</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter color"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Size</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter size"
              type="text"
            />
          </div>
          <div className="flex-1">
            <h6 className="font-semibold text-md">Stock</h6>
            <input
              className="border border-gray-500 rounded px-3 py-1 mt-1 w-full"
              placeholder="Enter stock"
              type="text"
            />
          </div>
          <div className="flex-1 flex items-end justify-center">
            <button className="bg-red-600 px-4 py-2 rounded-md text-white">
              Remove
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleFormSubmit}
        className="bg-black py-2 px-4 text-white rounded-md mt-4"
      >
        Submit
      </button>
    </div>
  )
}

export default AddProductForm
