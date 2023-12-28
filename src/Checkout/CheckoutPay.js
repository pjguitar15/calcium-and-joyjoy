import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Receipt from "./Receipt";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Store/cart";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";

function CheckoutPay({ onBack, onPay, checkoutData, discount }) {
  const [payment, setPayment] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [courier, setCourier] = useState("");
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [selectedPaymentMethodDetails, setSelectedPaymentMethodDetails] =
    useState({});
  const deliveryFee = 300;
  const cart = useSelector((state) => state.checkout);
  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCouriersAndPaymentMethods = async () => {
      setLoading(true);
      try {
        const [couriersResponse, paymentMethodsResponse] = await Promise.all([
          axios.get("http://18.223.157.202/backend/api/admin/couriers"),
          axios.get("http://18.223.157.202/backend/api/admin/payment-options"),
        ]);

        const activeCouriers = couriersResponse.data.filter(
          (courier) => courier.active === "true"
        );
        const activePaymentMethods = paymentMethodsResponse.data.filter(
          (method) => method.active === "true" || method.active === 1
        );

        setCouriers(activeCouriers);
        setPaymentMethods(activePaymentMethods);

        if (activeCouriers.length > 0) {
          setCourier(activeCouriers[0].courier_name);
        }
        if (activePaymentMethods.length > 0) {
          setPayment(activePaymentMethods[0].name);
        }
      } catch (error) {
        toast({
          title: "Error loading data",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      setLoading(false);
    };

    fetchCouriersAndPaymentMethods();
  }, [toast]);

  const handlePaymentChange = (paymentMethodName) => {
    setPayment(paymentMethodName);
    const selectedMethod = paymentMethods.find(
      (method) => method.name === paymentMethodName
    );
    setSelectedPaymentMethodDetails(selectedMethod || {});
  };

  const handlePay = () => {
    if (!receiptImage) {
      toast({
        title: "Please upload a receipt image",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const cartsData = cart.map((item) => {
      console.log(item.size);
      const data = {
        product_id: item.id,
        size: item.size || [""],
        session_id: "session123",
        user_id: user?.user_info.id,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      };

      return data;
    });

    const totalCartPrice = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    ) - discount; // Adjust total price by subtracting discount

    const postData = {
      checkoutData: {
        ...checkoutData,
        user_id: user?.user_info.id,
        payment_method: payment,
        courier,
        receipt_img: receiptImage,
        grand_total: totalCartPrice + deliveryFee, // Updated grand total
      },
      cartsData,
    };

    if (postData) {
      console.log(postData);
      setLoading(true);
      axios
        .post("http://18.223.157.202/backend/api/checkout", postData)
        .then((res) => {
          setLoading(false);
          toast({
            title: "Your order has been processed successfully!",
            description: "Going back to home page",
            status: "success",
            position: "top",
          });
          dispatch(clearCart());
          navigate("/thank-you");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      console.log("something wrong with postData");
    }
  };

  // Cloudinary Image Upload Function
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zwzmglhl"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbibwzs6c/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Image Upload Failed",
        description: "Failed to upload image to Cloudinary.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return null;
    }
  };

  // Handle Image Upload
  const handleImageUpload = async (file) => {
    setLoading(true);
    const imageUrl = await uploadImageToCloudinary(file);
    if (imageUrl) {
      setReceiptImage(imageUrl);
    }
    setLoading(false);
  };

  return (
    <Box m='32px'>
      {" "}
      {/* Outermost container with margin */}
      {/* Couriers RadioGroup */}
      <Text fontSize='24px' fontWeight='semibold' mb='24px'>
        Courier
      </Text>
      <Box
        borderRadius='10px'
        p='16px 32px'
        border='solid 1px #d1d1d1'
        mb='32px'
      >
        {" "}
        {/* Margin bottom for spacing */}
        <RadioGroup value={courier} onChange={(value) => setCourier(value)}>
          {loading && <LoadingSpinner />}
          <VStack align='normal'>
            {couriers.map((courier, index) => (
              <React.Fragment key={index}>
                <Radio value={courier.courier_name}>
                  {courier.courier_name}
                </Radio>
                {index < couriers.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </VStack>
        </RadioGroup>
      </Box>
      {/* Payment Methods RadioGroup */}
      <Text fontSize='24px' fontWeight='semibold' mb='24px'>
        Payment Method
      </Text>
      <Box
        borderRadius='10px'
        p='16px 32px'
        border='solid 1px #d1d1d1'
        mb='32px'
      >
        {" "}
        {/* Margin bottom for spacing */}
        <RadioGroup value={payment} onChange={handlePaymentChange}>
          {loading && <LoadingSpinner />}
          <VStack align='normal'>
            {paymentMethods.map((method, index) => (
              <React.Fragment key={index}>
                <Radio value={method.name}>{method.name}</Radio>
                {index < paymentMethods.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </VStack>
        </RadioGroup>
        {/* Display selected payment method details */}
        {selectedPaymentMethodDetails.name && (
          <Box mt='4' p='4' bg='gray.50' borderRadius='lg'>
            {" "}
            {/* Added padding and background */}
            <Text fontSize='md' color='black.700'>
              Account Name:{" "}
              <strong>{selectedPaymentMethodDetails.account_name}</strong>
            </Text>
            <Text fontSize='md' color='black.700'>
              Account Number:{" "}
              <strong>{selectedPaymentMethodDetails.account_number}</strong>
            </Text>
            <Text fontSize='md' color='black.700'>
              Instructions:{" "}
              <strong>
                {selectedPaymentMethodDetails.payment_instructions}
              </strong>
            </Text>
          </Box>
        )}
      </Box>
      {/* Image Upload Section */}
      <Text fontSize='24px' fontWeight='semibold' mb='24px'>
        Upload Receipt
      </Text>
      <Receipt onUpload={handleImageUpload} mb='32px' />{" "}
      {/* Updated Image upload component call */}
      {/* Action Buttons */}
      <Grid mt='24px' gap='40px' gridTemplateColumns='1fr 1fr'>
        <Button borderRadius='20px' p='16px 40px' onClick={onBack}>
          Back
        </Button>
        <Button
          disabled={loading}
          borderRadius='20px'
          p='16px 40px'
          onClick={handlePay}
        >
          {loading ? "Processing..." : "Continue"}
        </Button>
      </Grid>
    </Box>
  );
}
export default CheckoutPay;
