import React from 'react';
import {
  Box,
  Center,
  SimpleGrid,
  Text,
  Image,
  Button,
  VStack,
  useToast,
  AspectRatio,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Store/cart";
import axiosInstance from "../Shared/utils/axiosInstance";

function WishList({ list, setList }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteItemId, setDeleteItemId] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!user || !token) {
    toast({ title: "Authentication error", description: "No user token found.", status: "error" });
    return <Center py={6}><Text fontSize="lg">Authentication error</Text></Center>;
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(`user/wishlist/delete/${deleteItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setList(list.filter(item => item.id !== deleteItemId));
        toast({ title: "Item removed from wishlist", status: "success" });
      } else {
        toast({ title: "Failed to remove item", status: "error", description: response.statusText });
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      toast({ title: "Error removing item", status: "error", description: error.message });
    }
    onClose();
  };

  const handleDelete = (itemId) => {
    setDeleteItemId(itemId);
    onOpen();
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast({ title: "Added to cart", status: "success" });
  };

  if (!list || list.length === 0) {
    return <Center py={6}><Text fontSize="lg">Your wishlist is empty.</Text></Center>;
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} p={6}>
        {list.map((item) => (
          <Box key={item.id} p={5} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='lg' bg='white'>
            {item.product ? (
              <VStack spacing={5} align='stretch'>
                <AspectRatio ratio={4 / 3} borderRadius='md' overflow='hidden'>
                  <Image
                    src={item.product.image || '/placeholder-image.png'}
                    alt={item.product.name}
                    objectFit='cover'
                  />
                </AspectRatio>
                <Text fontWeight='bold' fontSize='lg'>{item.product.name}</Text>
                <Text fontSize='sm' color='gray.600'>{item.product.description}</Text>
                <Button colorScheme='teal' onClick={() => handleAddToCart(item.product)}>
                  Add to Cart
                </Button>
                <Button colorScheme='pink' onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </VStack>
            ) : (
              'Product details not available'
            )}
          </Box>
        ))}
      </SimpleGrid>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={undefined}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this item from your wishlist?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default WishList;
