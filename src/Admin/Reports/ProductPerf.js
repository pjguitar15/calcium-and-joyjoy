import React, { useEffect, useState } from "react";
import {
  Box, Button, Heading, Image, Grid, GridItem, useToast, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Divider, Text, Badge, Input, Flex, Select
} from "@chakra-ui/react";
import axiosInstance from "../../Shared/utils/axiosInstance";
import Pagination from './Pagination'; 
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ProductPerf = () => {
    const [productData, setProductData] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('');
    const toast = useToast();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/recommended_products");
                setProductData(response.data.most_sold_products);
                setDisplayedProducts(response.data.most_sold_products.slice(0, productsPerPage));
            } catch (error) {
                toast({
                    title: "Error loading data",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        };
        fetchProducts();
    }, [productsPerPage, toast]);

    useEffect(() => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const filteredData = productData.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedProducts(filteredData.slice(indexOfFirstProduct, indexOfLastProduct));
    }, [currentPage, productData, productsPerPage, searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
        const sortedData = [...productData];
        if (event.target.value === 'mostPurchased') {
            sortedData.sort((a, b) => b.purchases - a.purchases);
        } else if (event.target.value === 'priceLowToHigh') {
            sortedData.sort((a, b) => parseFloat(a.data.price) - parseFloat(b.data.price));
        } else if (event.target.value === 'priceHighToLow') {
            sortedData.sort((a, b) => parseFloat(b.data.price) - parseFloat(a.data.price));
        }
        setProductData(sortedData);
        setCurrentPage(1);
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to format price with PHP currency
    const formatPrice = (price) => {
        return `₱${parseFloat(price).toFixed(2)}`;
    };

    // Report generation
    const generateReport = () => {
        const reportData = productData.map(product => ({
            'Product Name': product.product_name,
            'Total Purchases': product.purchases,
            'Price': formatPrice(product.data.price),
            'Total Sales': formatPrice(parseFloat(product.data.price) * product.purchases)
        }));

        const worksheet = XLSX.utils.json_to_sheet(reportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, "ProductPerformanceReport.xlsx");
    };

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={5}>
                <Heading size="lg">Product Performance</Heading>
                <Button colorScheme="teal" onClick={generateReport}>Generate Report</Button>
            </Flex>

            <Flex justifyContent="space-between" mb={4}>
                <Input
                    placeholder="Search by product name"
                    onChange={handleSearchChange}
                />


                <Select onChange={handleSortChange}>
                    <option value="">Sort by</option>
                    <option value="mostPurchased">Most Purchased</option>
                    <option value="priceLowToHigh">Price (Low to High)</option>
                    <option value="priceHighToLow">Price (High to Low)</option>
                </Select>
            </Flex>

            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {displayedProducts.map((product, index) => (
                    <GridItem key={index} w="100%" bg="white" p={4} borderWidth="1px" borderRadius="15px" overflow="hidden" onClick={() => openModal(product)} shadow="sm">
                        {product.purchases >= 10 && <Badge colorScheme="green" p={1} mb={2}>Bestseller</Badge>}
                        <Image src={product.data.image} alt={product.product_name} boxSize="150px" borderRadius="15px" objectFit="cover" m="auto" />
                        <Divider my={2} />
                        <Text mt={2} fontWeight="bold" fontFamily="Arial, sans-serif" color="gray.700">{product.product_name}</Text>
                        <Text fontSize="sm" fontFamily="Arial, sans-serif" color="gray.500">Total Purchases: {product.purchases}</Text>
                        <Text fontSize="sm" fontFamily="Arial, sans-serif" color="gray.600">Price: {formatPrice(product.data.price)}</Text>
                        <Text fontSize="sm" fontFamily="Arial, sans-serif" color="gray.600">Total Sales: {formatPrice(parseFloat(product.data.price) * product.purchases)}</Text>
                    </GridItem>
                ))}
            </Grid>

            <Pagination 
                productsPerPage={productsPerPage} 
                totalProducts={productData.length} 
                paginate={paginate} 
                currentPage={currentPage}
            />

            <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
                <ModalOverlay />
                <ModalContent borderRadius="15px" p={6}>
                    <ModalHeader fontSize="2xl" fontWeight="bold">Product Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedProduct && (
                            <Box>
                                <Image src={selectedProduct.data.image} alt={selectedProduct.product_name} borderRadius="15px" boxSize="300px" objectFit="cover" m="auto" mb={4} />
                                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>{selectedProduct.product_name}</Text>
                                <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Description:</Box> {selectedProduct.data.description}</Text>
                                <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Total Purchases:</Box> {selectedProduct.purchases}</Text>
                                <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Price:</Box> {formatPrice(selectedProduct.data.price)}</Text>
                                <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Total Sales:</Box> {formatPrice(parseFloat(selectedProduct.data.price) * selectedProduct.purchases)}</Text>
                            </Box>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductPerf;
