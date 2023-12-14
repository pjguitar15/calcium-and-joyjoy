import React, { useEffect, useState } from "react";
import { IoClose, IoAddOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5"
import {
Box, Flex, FormControl, FormLabel, Input, Textarea, Button, IconButton, Select, Checkbox, RadioGroup, Radio, Stack, SimpleGrid, Image, useToast, Wrap, WrapItem, Heading
} from "@chakra-ui/react";
import axios from "axios";
import useBrands from "../../../Shared/Hooks/useBrands";
import useCategories from "../../../Shared/Hooks/useCategories";
import useProductTypes from "../../../Shared/Hooks/useProductTypes";
import useProductColors from "../../../Shared/Hooks/useProductColors";
import useProductSizes from "../../../Shared/Hooks/useProductSizes";

const AddProductForm = ({ handleBackToProducts, setIsAddingProducts }) => {
  const [isHovered, setIsHovered] = useState(false);
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
    <Box className="add-product-form">
    <Box className="form-container">
    <Flex justify="space-between" align="center" mb="4">
    <Heading mb="6">Product Form</Heading>    <IconButton 
        icon={isHovered ? <IoCloseCircleOutline className="text-4xl" /> : <IoClose className="text-4xl" />} 
        onClick={handleBackToProducts} 
        variant="unstyled"
        aria-label="Close form"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{ color: "red" }}
        />
        </Flex>

      <form onSubmit={handleFormSubmit} className="form">
      <Box p="5" borderWidth="2px" borderColor="black" borderRadius="lg" boxShadow="md" bg="white" mb="6">
    {/* Product Name */}
    <FormControl mb="4" isRequired>
      <FormLabel htmlFor="productName" className="block text-sm font-medium text-gray-700">
        Product Name
      </FormLabel>
      <Input
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="Enter product name"
        id="productName"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormControl>

    {/* Description */}
    <FormControl mb="4" isRequired>
      <FormLabel htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </FormLabel>
      <Textarea
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
        placeholder="Enter product description"
        id="description"
        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormControl>

    {/* Price and Brand */}
    <Flex gap="4">
      <FormControl mb="4" flex="1" isRequired>
        <FormLabel htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </FormLabel>
        <Input
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          placeholder="Enter product price"
          type="number"
          id="price"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormControl>

      <FormControl mb="4" flex="1" isRequired>
        <FormLabel htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
          Brand
        </FormLabel>
        <Select
          id="productCategory"
          value={selectedBrand}
          onChange={(event) => setSelectedBrand(event.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {brands?.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
          ))}
        </Select>
      </FormControl>
    </Flex>
  </Box>


  <Box p="5" borderWidth="2px" borderColor="black" borderRadius="lg" boxShadow="md" bg="white" mb="6">
  <Flex wrap="wrap" gap="6" justify="center">
    {/* Stocks Input */}
    <Box className="flex-1">
      <FormControl mb="4">
        <FormLabel className="block text-sm font-medium text-gray-700">
          Stocks
        </FormLabel>
        <Input
          type="number"
          name="stocks"
          value={stocksInput}
          onChange={(e) => setStocksInput(e.target.value)}
          className="appearance-none rounded-lg border border-gray-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormControl>
    </Box>

    {/* Gender Radio Buttons */}
    <Box className="flex-1">
      <FormControl mb="4">
        <FormLabel className="block text-sm font-medium text-gray-700">
          Gender
        </FormLabel>
        <RadioGroup onChange={setGender} value={gender}>
          <Stack direction="row" spacing="4">
            <Radio value="male" className="focus:ring-blue-500">
              Male
            </Radio>
            <Radio value="female" className="focus:ring-blue-500">
              Female
            </Radio>
            <Radio value="unisex" className="focus:ring-blue-500">
              Unisex
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Box>

    {/* Product Category */}
    <Box className="flex-1">
      <FormControl mb="4">
        <FormLabel htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
          Product Category
        </FormLabel>
        <Select
          id="productCategory"
          value={selectedProductCategory}
          onChange={(event) => setSelectedProductCategory(event.target.value)}
          className="mt-1 rounded-lg border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Flex>
</Box>



{/* Types, Colors, and Sizes Checkboxes with Card Style */}
<Wrap spacing="20px" justify="center">
  {/* Types Section */}
  <WrapItem>
    <Box p="5" borderWidth="2px" borderColor="black" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white" mb="6">
      <Heading as="h3" size="md" mb="3" color="teal.600">Types</Heading>
      <SimpleGrid columns={[2, null, 3]} spacing={3}>
        {productTypes?.map((item, index) => (
          <Checkbox key={index} id={`types_${index}`} value={item.name} isChecked={selectedProductTypes.includes(item.name)} onChange={(event) => handleCheckboxChange(event, setSelectedProductTypes)} colorScheme="teal">
            {item.name}
          </Checkbox>
        ))}
      </SimpleGrid>
    </Box>
  </WrapItem>

  {/* Colors Section */}
  <WrapItem>
    <Box p="5" borderWidth="2px" borderColor="black" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white" mb="6">
      <Heading as="h3" size="md" mb="3" color="teal.600">Colors</Heading>
      <SimpleGrid columns={[2, null, 3]} spacing={3}>
        {productColors?.map((item, index) => (
          <Checkbox key={index} id={`colors_${index}`} value={item.name} isChecked={selectedProductColors.includes(item.name)} onChange={(event) => handleCheckboxChange(event, setSelectedProductColors)} colorScheme="teal">
            {item.name}
          </Checkbox>
        ))}
      </SimpleGrid>
    </Box>
  </WrapItem>

  {/* Sizes Section */}
  <WrapItem>
    <Box p="5" borderWidth="2px" borderColor="black" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white" mb="6">
      <Heading as="h3" size="md" mb="3" color="teal.600">Sizes</Heading>
      <SimpleGrid columns={[2, null, 4]} spacing={3}>
        {productSizes?.map((item, index) => (
          <Checkbox key={index} id={`sizes_${index}`} value={item.name} isChecked={selectedProductSizes.includes(item.name)} onChange={(event) => handleCheckboxChange(event, setSelectedProductSizes)} colorScheme="teal">
            {item.name}
          </Checkbox>
        ))}
      </SimpleGrid>
    </Box>
  </WrapItem>
</Wrap>


{/* Image Upload Section */}
<FormControl mb="4">
  <FormLabel htmlFor="productImages" className="block text-sm font-medium text-gray-700">
    Product Images <span className="font-normal italic">(First selected image will be the featured image)</span>
  </FormLabel>
  
  {imagePreviews.length <= 0 && (
    <Box className="relative mt-1">
      <Input type="file" id="productImages" accept="image/jpeg, image/png" multiple onChange={handleImageChange} className="hidden" />
      <label htmlFor="productImages" className="cursor-pointer inline-block w-full h-24 border-dashed border-2 border-gray-400 rounded-md flex flex-col justify-center items-center hover:border-blue-500 focus:border-blue-500 focus:outline-none">
        <Box className="w-8 h-8 text-gray-400" as="svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </Box>
        <Box as="span" className="text-gray-400 text-xs">Drop images here</Box>
      </label>
    </Box>
  )}

<Flex wrap="wrap" mt="4">
  {imagePreviews.map((image, index) => (
    <Box key={index} className="relative m-2" position="relative">
      <Image src={image.preview} alt="Preview" className="w-48 h-48 object-cover rounded-md" />
      <Button onClick={() => removeImagePreview(index)} position="absolute" top="0" right="0" bg="white" rounded="full" p="1" className="shadow-md">
        <IoClose className="text-lg text-gray-800" />
      </Button>
    </Box>
  ))}
</Flex>
</FormControl>


          {/* Submit Button */}
          <Button type="submit" isLoading={loading || uploading} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
            {loading || uploading ? `Creating Product...` : `Submit`}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddProductForm;