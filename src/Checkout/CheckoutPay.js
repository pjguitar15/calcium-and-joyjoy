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
import { useState } from "react";
import Receipt from "./Receipt";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../Store/cart';

function CheckoutPay({ onBack, onPay, checkoutData }) {
  const [payment, setPayment] = useState("Gcash");
  const [courier, setCourier] = useState("J&T");
  const [loading, setLoading] = useState(false)

  const cart = useSelector((state) => state.checkout);

  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handlePay = () => {
    const deliveryFee = 300;
    console.log(checkoutData)

    const cartsData = cart.map((item) => ({
      product_id: item.id,
      size: item.size.toString(),
      session_id: "session123",
      user_id: user?.user_info.id,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }));

    // Calculate the total price of items in the cart
    const totalCartPrice = cartsData.reduce((total, item) => total + item.total, 0);

    if (!totalCartPrice) {
      return
    }

    const postData = {
      checkoutData: {
        ...checkoutData,
        user_id: user?.user_info.id,
        payment_method: payment,
        courier,
        receipt_img: "proof_1231231.jpg",
        grand_total: totalCartPrice + deliveryFee,
      },
      cartsData,
    };

    if (postData) {
      console.log(postData)
      setLoading(true)
      // const res = await axiosInstance.post("/checkout", JSON.stringify(postData));
      axios.post("http://18.223.157.202/backend/api/checkout", postData).then((res) => {
        console.log(res)
        setLoading(false)
        toast({
          title: "Your order has been processed successfully!",
          description: "Going back to home page",
          status: "success",
          position: "top",
        });
        dispatch(clearCart());

        navigate("/")
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
    } else {
      console.log("something wrong with postData")
    }
  };

  return (
    <Box>
      <Text fontSize='24px' fontWeight='semibold' mb='24px' mt='48px'>
        Courier
      </Text>
      <RadioGroup
        borderRadius='10px'
        p='16px 32px'
        border='solid 1px #d1d1d1'
        defaultValue='J&T'
        value={courier}
        onChange={(e) => setCourier(e)}
      >
        <VStack align='normal'>
          <Radio value='J&T'>J&T Express</Radio>
          <Divider />
          <Radio value='LBC'>LBC</Radio>
        </VStack>
      </RadioGroup>

      <Text fontSize='24px' fontWeight='semibold' mb='24px' mt='48px'>
        Payment Method
      </Text>
      <RadioGroup
        borderRadius='10px'
        p='16px 32px'
        border='solid 1px #d1d1d1'
        value={payment}
        onChange={setPayment}
      >
        <VStack align='normal'>
          <Radio value='Gcash'>Gcash</Radio>
          {payment === "Gcash" && (
            <VStack alignItems='normal' fontWeight='semibold'>
              <Text>Number: 09999999999</Text>
              <Text>Name: MJ MUIT</Text>
            </VStack>
          )}
          <Divider />
          <Radio value='Bank transfer'>Bank Transfer</Radio>
          {payment === "Bank transfer" && (
            <VStack alignItems='normal' fontWeight='semibold'>
              <Text>Name: MJ MUIT</Text>
              <Text>Account Number: 123-4567-8901 (BDO) </Text>
            </VStack>
          )}
          <Receipt onUpload={(file) => console.log(file)} />
        </VStack>
      </RadioGroup>

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
