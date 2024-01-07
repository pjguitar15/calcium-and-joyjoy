import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { Grid, useToast, Box, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";import { addToCart, addToCheckout } from "../Store/cart";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import useProductSizes from "../Shared/Hooks/useProductSizes";
import ProductImages from "./subcomponents/ProductImages";
import ProductDetails from "./subcomponents/ProductDetails";
import ProductDescription from "./subcomponents/ProductDescription";
import AddedToast from "./AddedToast";
import { AnimatePresence } from "framer-motion";
import ProductReviews from "./subcomponents/ProductReviews";

function ItemPage() {
  const { productID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { productSizes } = useProductSizes();
  const [showAdded, setShowAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(productSizes[0]?.name || null);
  const [qty, setQty] = useState(1);

  const getShoe = async () => {
    const res = await axiosInstance.get(`/shoes/${productID}`);
    return res.data;
  };

  const { data: shoe, isLoading } = useQuery('shoeItem', getShoe);

  if (isLoading) return <LoadingSpinner />;

  const handleAddToCart = () => {
    dispatch(addToCart({
        ...shoe,
        quantity: qty,
        price: shoe.price, // Unit price
        size: selectedSize,
    }));
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1200);
};

  const handleCheckout = () => {
    dispatch(addToCheckout({
      ...shoe,
    quantity: qty,
    price: shoe.price, // price per unit
    size: selectedSize,
    }));
    navigate("/checkout");
  };

  const handleWishList = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast({
        position: "top",
        status: "error",
        description: "Login to add a wishlist",
      });
      return;
    }

    toast({ position: "top", status: "success", title: "Added to wishlist" });
    await axiosInstance.post("/user/wishlist/store", {
      user_id: user.user_info.id,
      product_id: productID
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
  };

  return (
    <>
      <AnimatePresence>
        {(showAdded || isHovered) && (
          <AddedToast
            item={{ ...shoe, quantity: qty, size: selectedSize }}
            show={() => setIsHovered(true)}
            dismount={() => setIsHovered(false)}
          />
        )}
      </AnimatePresence>
  
      <Grid justifyContent='center' pr='40px' alignItems='center' gridTemplateColumns='1.3fr 1fr' gap='80px' maxW='1100px' mx='auto' pos='relative'>
      <ProductImages mainImage={shoe.image} imageList={shoe.images} />
      <ProductDetails
        shoe={shoe}
        onAddToCart={handleAddToCart}
        onWishList={handleWishList}
        onCheckout={handleCheckout}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        qty={qty}
        setQty={setQty}
        sizes={productSizes.map(s => s.name)}
      />
          <Box gridColumn='span 2'>
            <ProductDescription description={shoe.description} />
            {shoe.reviews.length > 0 ? (
          <ProductReviews reviews={shoe.reviews.map(review => ({...review, user_id: `${review.user.firstname} ${review.user.lastname}`}))} rating={shoe.rating} />
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
            <Text fontSize="2xl" fontWeight="bold">
              No ratings yet.
            </Text>
            <Text fontSize="md" color="gray.500">
              Be the first to review this product!
            </Text>
          </Box>
        )}
          </Box>
        </Grid>
        </>
      );
    }

export default ItemPage;