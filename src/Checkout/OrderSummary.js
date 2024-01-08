import React, { useEffect, useState } from 'react';
import {
  Box, Heading, HStack, Text, Input, VStack, Grid, Image, Button, useToast
} from "@chakra-ui/react";
import useSubtotal from "../Shared/Hooks/useSubtotal";
import convertCurrency from "../Shared/utils/convertCurrency";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearCheckout } from '../Store/cart';
import axiosInstance from '../Shared/utils/axiosInstance';

function OrderSummary({ setDiscount }) { // Accept setDiscount as a prop
  const subtotal = useSubtotal();
  const checkout = useSelector((state) => state.checkout);
  const [voucher, setVoucher] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [discountValue, setDiscountValue] = useState(0); // Local state for display purposes
  const [params, setParams] = useSearchParams();
  const toast = useToast();
  const dispatch = useDispatch();

  

  const [shippingRate, setShippingRate] = useState(0);
  useEffect(() => {
    axiosInstance.get('/admin/general-settings')
      .then(response => {
        setShippingRate(response.data.shipping_rate);
      })
      .catch(error => {
        console.log('Error fetching shipping rate:', error); // Log the error to the console
        toast({
          title: 'Error',
          description: 'Failed to fetch shipping rate.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);
  


  useEffect(() => {
    axiosInstance.get('/admin/discount_coupons')
      .then(response => {
        setCoupons(response.data);
      })
      .catch(error => {
        toast({
          title: 'Error',
          description: 'Failed to fetch discount coupons.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  useEffect(() => {
    params.set("voucher", voucher);
    setParams(params);
  }, [voucher]);

  useEffect(() => {
    return () => {
      dispatch(clearCheckout());
    };
  }, [dispatch]);

  const handleApplyVoucher = () => {
    const validCoupon = coupons.find(coupon => coupon.discount_code === voucher);
    if (validCoupon) {
      const discountAmount = validCoupon.total_amount;
      setDiscountValue(discountAmount); // Update local state
      setDiscount(discountAmount); // Update discount in CheckoutPage
      toast({
        title: 'Voucher Applied',
        description: 'Discount applied successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setDiscountValue(0);
      setDiscount(0); // Reset discount in CheckoutPage
      toast({
        title: 'Invalid Voucher',
        description: 'The voucher code entered is not valid.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  // Ensure the values are numbers before calculations
  const numericSubtotal = parseFloat(subtotal) || 0;
  const numericShippingRate = parseFloat(shippingRate) || 0;
  const numericDiscountValue = parseFloat(discountValue) || 0;

  // Perform calculations with numbers
  const total = numericSubtotal + numericShippingRate - numericDiscountValue;

  // Format the total for display
  const formattedTotal = convertCurrency(total);


  return (
    <Box>
      <Heading fontWeight='normal' mb='24px'>Order Summary</Heading>
      <Box color='gray.500' borderBottom='solid 1px #d1d1d1' pb='16px'>
        <HStack justifyContent='space-between'>
          <Text>Subtotal</Text>
          <Text> {convertCurrency(subtotal)} </Text>
        </HStack>
        <HStack justifyContent='space-between'>
          <Text>Shipping</Text>
          <Text>{convertCurrency(shippingRate)}</Text>
        </HStack>
        <HStack mt='16px' justifyContent='space-between'>
          <Text>Voucher</Text>
          <Input
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            textAlign='center'
            maxW='160px'
            placeholder='Enter code'
          />
          <Button onClick={handleApplyVoucher} colorScheme='blue'>Apply</Button>
        </HStack>
        <HStack justifyContent='space-between' mt='16px'>
          <Text>Discount</Text>
          <Text>-{convertCurrency(discountValue)}</Text>
        </HStack>
      </Box>
      <HStack justifyContent='space-between'>
        <Text>Total</Text>
        <Text>{formattedTotal}</Text>
      </HStack>
      <VStack gap='8px' mt='24px' maxH='45vh' overflowY='auto'>
        {checkout.map((item, i) => (
          <Grid
            key={i}
            gap='16px'
            alignItems='start'
            gridTemplateColumns='1fr 1fr'
          >
            <Box overflow='hidden' borderRadius='10px' maxH='160px'>
              <Image
                src={item.image || "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"}
                alt={item.name}
                loading='lazy'
              />
            </Box>
            <VStack
              fontWeight='semibold'
              fontSize='14px'
              gap='0px'
              alignItems='normal'
            >
              <Text fontWeight='bold'>{item.name}</Text>
              <Text color='gray.500'>Men/Women's Shoes</Text>
              {item.size && <Text>Size: {item.size}</Text>}
              <Text>Quantity: {item.quantity}</Text>
              <Text>{convertCurrency(item.price)}</Text>
            </VStack>
          </Grid>
        ))}
      </VStack>
    </Box>
  );
}

export default OrderSummary;