import { Box, Button, Grid, VStack, HStack, Heading, Text, InputGroup, InputLeftAddon, Input, InputRightAddon } from '@chakra-ui/react';
import convertCurrency from '../../Shared/utils/convertCurrency';

const ProductDetails = ({ shoe, onAddToCart, onWishList, onCheckout, selectedSize, setSelectedSize, qty, setQty, sizes }) => {
    const handleQtyChange = (e) => {
        const value = Math.max(1, Math.min(10, Number(e.target.value)));
        setQty(value);
    };

    // Check if a size is available in shoe
    const isSizeAvailable = (size) => {
        return shoe.sizes && shoe.sizes.some(s => s.size.name === size);
    };

    // Check if the product has sizes
    const hasSizes = shoe.sizes && shoe.sizes.length > 0;

    // Determine the product type text
    const productTypeText = shoe.category ? shoe.category.name : (shoe.gender === "male" ? "Men's" : "Women's") + ' shoes';

    // Check if the product has sizes and if a size has been selected
    const isSizeSelectedOrNotRequired = !hasSizes || (hasSizes && selectedSize !== null);

    return (
        <Box padding="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Heading as="h2" size="xl" fontWeight="bold" mb="4">{shoe.name}</Heading>
            <Text fontSize="lg" color="gray.600" mb="2">{productTypeText}</Text>
            <Text fontSize="2xl" fontWeight="bold" my="2">{convertCurrency(shoe.price)}</Text>
            <Text my="2" mb="4">Colors: {shoe.colors.map(colorObj => colorObj.color.name).join(', ')}</Text>
            <HStack my="4">
                <Text fontWeight="bold">Quantity:</Text>
                <InputGroup size="sm" maxW="140px">
                    <InputLeftAddon children='-' cursor="pointer" onClick={() => setQty(qty > 1 ? qty - 1 : 1)} />
                    <Input value={qty} type="number" onChange={handleQtyChange} textAlign="center" />
                    <InputRightAddon children='+' cursor="pointer" onClick={() => setQty(qty < 10 ? qty + 1 : 10)} />
                </InputGroup>
            </HStack>

            {hasSizes && (
                <>
                    <Text fontWeight="bold" mb="2">Sizes</Text>
                    <Grid templateColumns="repeat(4, 1fr)" gap="2" mb="4">
                        {sizes.map((size) => (
                            <Button
                                key={size}
                                variant={selectedSize === size ? 'solid' : 'outline'}
                                borderColor={selectedSize === size ? "#daa520" : "gray.300"}
                                borderWidth={selectedSize === size ? "2px" : "1px"}
                                color={selectedSize === size ? "#daa520" : "gray.800"}
                                _hover={{ bg: selectedSize === size ? "#fff5c9" : "gray.100" }}
                                onClick={() => setSelectedSize(size)}
                                isDisabled={!isSizeAvailable(size)}
                            >
                                US {size}
                            </Button>
                        ))}
                    </Grid>
                </>
            )}

            <VStack spacing="4">
                <HStack spacing="4" w="full">
                    <Button 
                        onClick={onAddToCart} 
                        bgColor='gray' 
                        _hover={{ bgColor: "var(--accent)" }}
                        color='white' 
                        borderRadius='20px' 
                        w="full"
                        isDisabled={!isSizeSelectedOrNotRequired} // Disable if sizes are available but no size is selected
                    >
                        Add to Cart
                    </Button>
                    <Button onClick={onWishList} border='solid 2px gray' bgColor='none' color='gray' borderRadius='20px' w="full">Wishlist</Button>
                </HStack>
                <Button 
                    onClick={onCheckout} 
                    bgColor='gray' 
                    _hover={{ bgColor: "var(--accent)" }}
                    color='white' 
                    borderRadius='20px' 
                    w="full"
                    isDisabled={!isSizeSelectedOrNotRequired} // Disable if sizes are available but no size is selected
                >
                    Checkout
                </Button>
            </VStack>
        </Box>
    );
};

export default ProductDetails;
