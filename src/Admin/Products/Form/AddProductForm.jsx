import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import axios from "axios"
import useBrands from "../../../Shared/Hooks/useBrands"
import useCategories from "../../../Shared/Hooks/useCategories"
import useProductTypes from "../../../Shared/Hooks/useProductTypes"
import useProductColors from "../../../Shared/Hooks/useProductColors"
import useProductSizes from "../../../Shared/Hooks/useProductSizes"
import { useToast } from "@chakra-ui/toast"

const AddProductForm = ({ handleBackToProducts, setIsAddingProducts }) => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("")
  const [selectedProductTypes, setSelectedProductTypes] = useState([])
  const [selectedProductColors, setSelectedProductColors] = useState([])
  const [selectedProductSizes, setSelectedProductSizes] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("")
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  const [imagePreviews, setImagePreviews] = useState([])
  const [nameInput, setNameInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [priceInput, setPriceInput] = useState(0)
  const [gender, setGender] = useState("male")
  const [stocksInput, setStocksInput] = useState(1)

  const toast = useToast()
  const { brands } = useBrands()
  const { categories } = useCategories()
  const { productTypes } = useProductTypes()
  const { productColors } = useProductColors()
  const { productSizes } = useProductSizes()

  useEffect(() => {
    setSelectedProductCategory([categories[0]?.id])
    setSelectedProductTypes([productTypes[0]?.name])
    setSelectedProductColors([productColors[0]?.name])
    setSelectedProductSizes([productSizes[0]?.name])

    setSelectedBrand(brands[0]?.id)
  }, [brands, productTypes, categories, productColors, productSizes])

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
    setImages(files)
    const newImagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImagePreviews([...imagePreviews, ...newImagePreviews])
  }

  const removeImagePreview = (index) => {
    setImagePreviews(imagePreviews.filter((_, idx) => idx !== index))
  }

  const handleImageUpload = async () => {
    setUploading(true)

    const uploadPromises = images.map(async (file) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "zwzmglhl") // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dbibwzs6c/image/upload",
          formData
        )

        return response.data.secure_url
      } catch (error) {
        console.error("Error uploading image:", error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)
    const filteredImages = uploadedImages.filter((url) => url !== null)

    setUploading(false)
    return filteredImages
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const imageUrl = await handleImageUpload(images)

    const payload = {
      name: nameInput,
      description: descriptionInput,
      price: priceInput.toString(),
      brand_id: selectedBrand.toString(),
      status: "in stock",
      stocks: stocksInput.toString(),
      image: imageUrl[0],
      images: imageUrl,
      gender,
      product_category_id: selectedProductCategory.toString(),
      types: selectedProductTypes,
      sizes: selectedProductSizes,
      colors: selectedProductColors,
      socks: "mid",
    }
    console.log(payload)
    console.log("uploading to POST API...")
    setLoading(true)

    axios
      .post(`http://18.223.157.202/backend/api/admin/products/store`, payload)
      .then((res) => {
        console.log(res)
        setLoading(false)
        setImages([])
        setNameInput("")
        setDescriptionInput("")
        setIsAddingProducts(false)
        toast({
          title: "Congratulations!",
          description: "Your product has been added successfully",
          status: "success",
          position: "top",
        })
      })
      .catch((err) => console.log(err))
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
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
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
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              placeholder="Enter product description"
              id="description"
              name="description"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price
              </label>
              <input
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                placeholder="Enter product price"
                type="number"
                id="price"
                name="price"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4 flex-1">
              <label
                htmlFor="productCategory"
                className="block text-sm font-medium text-gray-600"
              >
                Brand
              </label>
              <select
                id="productCategory"
                name="productCategory"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
              >
                {brands?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-600">
                Stocks
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  name="stocks"
                  value={stocksInput}
                  className="appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setStocksInput(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-600">
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-1"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-1"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="unisex"
                    className="mr-1"
                    checked={gender === "unisex"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Unisex
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
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
                value={selectedProductCategory}
                onChange={(event) =>
                  setSelectedProductCategory(event.target.value)
                }
              >
                {categories.map((item, index) => (
                  <option key={index} value={item.id}>
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
              <div className="mt-1">
                {productTypes?.map((item, index) => (
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
                {productColors?.map((item, index) => (
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
                {productSizes?.map((item, index) => (
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
              Product Images{" "}
              <span className="font-normal italic">
                (First selected image will be the featured image)
              </span>
            </label>
            <div className="relative mt-1">
              {imagePreviews.length <= 0 && (
                <>
                  <input
                    type="file"
                    id="productImages"
                    name="productImages"
                    accept="image/jpeg, image/png"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="productImages"
                    className="cursor-pointer inline-block w-52 h-24 border-dashed border-2 border-gray-400 rounded-md flex flex-col justify-center items-center hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                  >
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-gray-400 text-xs">
                      Drop images here
                    </span>
                  </label>
                  <span className="ml-2" id="file-selected"></span>
                </>
              )}
            </div>

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
            disabled={loading || uploading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading || uploading ? `Creating Product...` : `Submit`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm
