import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { Box, Grid, useToast } from "@chakra-ui/react";
import { addToCart, addToCheckout } from "../Store/cart";
import axiosInstance from "../Shared/utils/axiosInstance";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import useProductSizes from "../Shared/Hooks/useProductSizes";
import ProductImages from "./subcomponents/ProductImages";
import ProductDetails from "./subcomponents/ProductDetails";
import ProductDescription from "./subcomponents/ProductDescription";
import AddedToast from "./AddedToast";
import { AnimatePresence } from "framer-motion";

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
      price: shoe.price * qty,
      size: selectedSize,
    }));
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1200);
  };

  const handleCheckout = () => {
    dispatch(addToCheckout({
      ...shoe,
      quantity: qty,
      price: shoe.price * qty,
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
        <ProductDescription description={shoe.description} />
      </Grid>
      {/* Additional sections like Reviews can go here */}
    </>
  );
}

export default ItemPage;