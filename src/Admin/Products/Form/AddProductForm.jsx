import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { FaCaretDown } from "react-icons/fa"
import config from "../../../Shared/utils/config"
import axios from "axios"

const AddProductForm = ({ handleBackToProducts }) => {
  const [selectedProductType, setSelectedProductType] = useState("")
  const [mainImage, setMainImage] = useState(null)
  const [productCategories, setProductCategories] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [productColors, setProductColors] = useState([])
  const [imagePreviews, setImagePreviews] = useState([]);


  useEffect(() => {
    axios
      .get("http://18.223.157.202/backend/api/admin/product/categories")
      .then((res) => {
        setProductCategories(res.data)
      })

    axios
      .get("http://18.223.157.202/backend/api/admin/product/types")
      .then((res) => {
        setProductTypes(res.data)
      })

    axios
      .get("http://18.223.157.202/backend/api/admin/product/colors")
      .then((res) => {
        setProductColors(res.data)
      })
  }, [])

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImagePreviews([...imagePreviews, ...newImagePreviews]);
  };

  const removeImagePreview = (index) => {
    setImagePreviews(imagePreviews.filter((_, idx) => idx !== index));
  };

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Product Form</h2>
          <button
            onClick={handleBackToProducts}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              placeholder="Enter product name"
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
              placeholder="Enter product description"
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
              placeholder="Enter product price"
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
              {productCategories.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
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
              {productTypes.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
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
              {productColors.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
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
            onChange={handleImageChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
          <div className="flex flex-wrap mt-4">
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative m-2">
                <img src={image.preview} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                <button onClick={() => removeImagePreview(index)} className="absolute top-0 right-0 bg-white rounded-full p-1">
                  <IoClose className="text-lg text-gray-800"/>
                </button>
              </div>
            ))}
          </div>
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
