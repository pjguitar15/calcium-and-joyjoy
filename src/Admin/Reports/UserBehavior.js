import React, { useEffect, useState } from "react";
import {
  Box, Button, Heading, Image, Grid, GridItem, useToast, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Input, Flex, Text, Badge, InputGroup, InputLeftElement, Select, Divider
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axiosInstance from "../../Shared/utils/axiosInstance";
import Pagination from './Pagination';

function UserBehaviorReport() {
    const [productData, setProductData] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast();

    // Sorting state
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/shoes");
                const sortedData = response.data.sort((a, b) => b.product_view - a.product_view);
                setProductData(sortedData);
                setDisplayedProducts(sortedData.slice(0, productsPerPage));
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
        setDisplayedProducts(productData.slice(indexOfFirstProduct, indexOfLastProduct));
    }, [currentPage, productData, productsPerPage]);

    const handleSort = (type) => {
        setSortType(type);
        let sortedProducts = [...productData];
        if (type === 'views') {
            sortedProducts.sort((a, b) => b.product_view - a.product_view);
        } else if (type === 'priceLowToHigh') {
            sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (type === 'priceHighToLow') {
            sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        setProductData(sortedProducts);
        setCurrentPage(1); // Reset to the first page after sorting
    };
    
    

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const generateReport = () => {
        const flatData = productData.map(product => ({
            'Product Name': product.name,
            'Category': product.category.name,
            'Product View': product.product_view,
            'Price': product.price
        }));
    
        const ws = XLSX.utils.json_to_sheet(flatData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const blob = new Blob([s2ab(excelBuffer)], { type: 'application/octet-stream' });
        saveAs(blob, 'product_view_report.xlsx');
    };

    const s2ab = s => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Box p={5}>
            <Flex justifyContent="space-between" alignItems="center" mb={5}>
                <Heading size="lg">User Behavior Report: Product Views</Heading>
                <Button colorScheme="teal" onClick={generateReport}>Generate Report</Button>
            </Flex>

            <Flex justifyContent="space-between" mb={4}>
                <InputGroup w="300px">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.300" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search by product name"
                        onChange={(e) => {
                            setCurrentPage(1);
                            const filtered = productData.filter(product =>
                                product.name.toLowerCase().includes(e.target.value.toLowerCase())
                            );
                            setDisplayedProducts(filtered.slice(0, productsPerPage));
                        }}
                    />
                </InputGroup>

                <Select w="200px" onChange={(e) => handleSort(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="views">Most Viewed</option>
                    <option value="priceLowToHigh">Price (Low to High)</option>
                    <option value="priceHighToLow">Price (High to Low)</option>
                </Select>
                </Flex>


            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {displayedProducts.map((product, index) => (
                    <GridItem key={product.id} w="100%" bg="white" p={4} borderWidth="1px" borderRadius="15px" overflow="hidden" onClick={() => openModal(product)} shadow="sm">
                        {(currentPage === 1 && index < 10) && <Badge colorScheme="green" p={1} mb={2}>Top Viewed</Badge>}
                        <Image src={product.image} alt={product.name} boxSize="150px" borderRadius="15px" objectFit="cover" m="auto" />
                        <Divider my={2} />
                        <Text mt={2} fontWeight="bold" fontFamily="Arial, sans-serif" color="gray.700">{product.name}</Text>
                        <Text fontSize="sm" fontFamily="Arial, sans-serif" color="gray.500">Category: {product.category.name}</Text>
                        <Text fontFamily="Arial, sans-serif" color="gray.600">Views: {product.product_view}</Text>
                        <Text fontFamily="Arial, sans-serif" color="gray.600">Price: {product.price}</Text>
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
                    <Image src={selectedProduct.image} alt={selectedProduct.name} borderRadius="15px" boxSize="300px" objectFit="cover" m="auto" mb={4} />
                    <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>{selectedProduct.name}</Text>
                    <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Description:</Box> {selectedProduct.description}</Text>
                    <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Views:</Box> {selectedProduct.product_view}</Text>
                    <Text fontSize="md" mb={2}><Box as="span" fontWeight="bold">Price:</Box> {selectedProduct.price}</Text>

                </Box>
            )}
        </ModalBody>
    </ModalContent>
</Modal>

        </Box>
    );
}

export default UserBehaviorReport;
