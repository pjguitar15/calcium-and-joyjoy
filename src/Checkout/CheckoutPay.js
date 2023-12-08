import {
  Box,
  Button,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Receipt from "./Receipt";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";

function CheckoutPay({ onBack, onPay, checkoutData }) {
  const [payment, setPayment] = useState("Gcash");
  const [courier, setCourier] = useState("1");

  const cart = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));

  const handlePay = async () => {
    const cartsData = cart.map((item) => ({
      product_id: item.id,
      size: item.size,
      session_id: "session123",
      user_id: user?.user_info.id,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }));
    const postData = {
      checkoutData: {
        ...checkoutData,
        user_id: user?.user_info.id,
        payment_method: payment,
        courier,
        receipt_img: "proof_1231231.jpg",
        grand_total: 200,
        region: "kantot",
      },
      cartsData,
    };

    console.log(postData);
    const res = await axiosInstance.post("/checkout", JSON.stringify(postData));
    console.log(res);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: handlePay,
    onSuccess: () => {},
    onError: () => {},
  });

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
          {payment === "1" && (
            <VStack alignItems='normal' fontWeight='semibold'>
              <Text>Number: 0922-tutunog-tunog</Text>
              <Text>Name: Calcium A. Joyjoy</Text>
            </VStack>
          )}
          <Divider />
          <Radio value='Bank transfer'>Bank Transfer</Radio>
          {payment === "2" && (
            <VStack alignItems='normal' fontWeight='semibold'>
              <Text>Bank: BDO Unibank</Text>
              <Text>Account Number: 123-4567-8901</Text>
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
          isLoading={isLoading}
          borderRadius='20px'
          p='16px 40px'
          onClick={mutate}
        >
          Continue
        </Button>
      </Grid>
    </Box>
  );
}

export default CheckoutPay;
