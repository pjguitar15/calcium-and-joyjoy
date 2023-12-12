import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import { FaCaretDown } from "react-icons/fa"
import config from "../../../Shared/utils/config"
import axios from "axios"

const AddProductForm = ({ handleBackToProducts }) => {
  const [selectedProductCategories, setSelectedProductCategories] = useState([])
  const [selectedProductTypes, setSelectedProductTypes] = useState([])
  const [selectedProductColors, setSelectedProductColors] = useState([])
  const [selectedProductSizes, setSelectedProductSizes] = useState([])
  const [mainImage, setMainImage] = useState(null)
  const [productCategories, setProductCategories] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [productColors, setProductColors] = useState([])
  const [productSizes, setProductSizes] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  useEffect(() => {
    axios
      .get("http://18.223.157.202/backend/api/admin/product/categories")
      .then((res) => {
        setProductCategories(res.data)
        setSelectedProductCategories([res.data[0].name])
      })

    axios
      .get("http://18.223.157.202/backend/api/admin/product/types")
      .then((res) => {
        setProductTypes(res.data)
        setSelectedProductTypes([res.data[0].name])
      })

    axios
      .get("http://18.223.157.202/backend/api/admin/product/colors")
      .then((res) => {
        setProductColors(res.data)
        setSelectedProductColors([res.data[0].name])
      })

    axios
      .get("http://18.223.157.202/backend/api/admin/product/sizes")
      .then((res) => {
        setProductSizes(res.data)
        setSelectedProductSizes([res.data[0].name])
      })
  }, [])

  const handleCheckboxChange = (event, setStateFunction) => {
    const { value } = event.target

    setStateFunction((prevSelection) => {
      if (prevSelection.includes(value)) {
        return prevSelection.filter((item) => item !== value)
      } else {
        return [...prevSelection, value]
      }
    })
  }

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files)
    const newImagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImagePreviews([...imagePreviews, ...newImagePreviews])
  }

  const removeImagePreview = (index) => {
    setImagePreviews(imagePreviews.filter((_, idx) => idx !== index))
  }

  const handleMainImageChange = (event) => {
    const file = event.target.files[0]
    // You can use the 'file' variable for further processing or display a preview
    setMainImage(file)
  }

  // Handler for updating the selected product type
  const handleProductTypeChange = (event) => {
    setSelectedProductTypes(event.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const baseUrl = config.apiUrl
    // http://18.223.157.202/backend/api/admin/products/store
    /* 
      Payload

    */
    console.log(selectedProductCategories)
  }
  return (
    <div className="add-product-form">
      <div className="form-container">
        <div className="form-header flex justify-between items-center mb-4">
          <h2 className="form-title text-2xl font-bold">Product Form</h2>
          <button
            onClick={handleBackToProducts}
            className="close-button text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
        <form onSubmit={handleFormSubmit} className="form">
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

          <div className="grid grid-cols-4">
            <div className="mb-4">
              <label
                htmlFor="productCategory"
                className="block text-sm font-medium text-gray-600"
              >
                Product Category
              </label>
              <div className="mt-1">
                {productCategories.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`productCategory_${index}`}
                      name="productCategory"
                      value={item.name}
                      checked={selectedProductCategories.includes(item.name)}
                      onChange={(event) =>
                        handleCheckboxChange(
                          event,
                          setSelectedProductCategories
                        )
                      }
                      className="mr-2"
                    />
                    <label htmlFor={`productCategory_${index}`}>
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="types"
                className="block text-sm font-medium text-gray-600"
              >
                Types
              </label>
              <div className="mt-1">
                {productTypes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`types_${index}`}
                      name="types"
                      value={item.name}
                      checked={selectedProductTypes.includes(item.name)}
                      onChange={(event) =>
                        handleCheckboxChange(event, setSelectedProductTypes)
                      }
                      className="mr-2"
                    />
                    <label htmlFor={`types_${index}`}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="colors"
                className="block text-sm font-medium text-gray-600"
              >
                Colors
              </label>
              <div className="mt-1">
                {productColors.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`colors_${index}`}
                      name="colors"
                      value={item.name}
                      checked={selectedProductColors.includes(item.name)}
                      onChange={(event) =>
                        handleCheckboxChange(event, setSelectedProductColors)
                      }
                      className="mr-2"
                    />
                    <label htmlFor={`colors_${index}`}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="sizes"
                className="block text-sm font-medium text-gray-600"
              >
                Sizes
              </label>
              <div className="mt-1">
                {productSizes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`sizes_${index}`}
                      name="sizes"
                      value={item.name}
                      checked={selectedProductSizes.includes(item.name)}
                      onChange={(event) =>
                        handleCheckboxChange(event, setSelectedProductSizes)
                      }
                      className="mr-2"
                    />
                    <label htmlFor={`sizes_${index}`}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
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
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    onClick={() => removeImagePreview(index)}
                    className="absolute top-0 right-0 bg-white rounded-full p-1"
                  >
                    <IoClose className="text-lg text-gray-800" />
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
