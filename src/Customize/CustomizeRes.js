import { Box, Center, Grid, HStack, Image, Text, VStack, useToast } from "@chakra-ui/react";
import convertCurrency from "../Shared/utils/convertCurrency";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCheckout } from '../Store/cart';
import axiosInstance from "../Shared/utils/axiosInstance";

function CustomizeRes({ results }) {
  const [prices, setPrices] = useState({ shoe: 0, sock: 0, accessory: 0 });
  const [shippingRate, setShippingRate] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast(); 
  const { shoe, sock, accessory } = results;


  
  useEffect(() => {
    setPrices({
      shoe: shoe ? Number(shoe.price) : 0,
      sock: sock ? Number(sock.price) : 0,
      accessory: accessory ? Number(accessory.price) : 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    axiosInstance.get('/admin/general-settings')
      .then(response => {
        setShippingRate(response.data.shipping_rate);
      })
      .catch(error => {
        console.log('Error fetching shipping rate:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch shipping rate.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [shoe, sock, accessory, toast]);

    // Ensure the values are numbers before calculations
    const numericSubtotal = parseFloat(Object.values(prices).reduce((acc, price) => acc + price, 0)) || 0;
    const numericShippingRate = parseFloat(shippingRate) || 0;
  
    // Perform calculations with numbers
    const total = numericSubtotal + numericShippingRate;
  
    // Format the total for display
    const formattedTotal = convertCurrency(total);

  const ItemCard = ({ item, type }) => (
    <HStack w="100%" justify="space-between">
      <Box>
        <HStack gap="16px">
          <Center borderRadius="10px" maxW="160px" aspectRatio="1/1" overflow="hidden" border="solid 1.6px black">
            {item?.name ? (
              <Image src={item.image || getDefaultImage(type)} alt={type} maxW="160px" />
            ) : (
              <PlaceholderIcon />
            )}
          </Center>
          <Box>
            <Text fontWeight="semibold">{item?.name || `No ${type} selected`}</Text>
            <Text opacity=".7">{item?.name ? `${type.charAt(0).toUpperCase() + type.slice(1)}` : `Please select a ${type} below`}</Text>
          </Box>
        </HStack>
      </Box>
      <Text>{convertCurrency(prices[type])}</Text>
    </HStack>
  );

  const getDefaultImage = (type) => {
    switch (type) {
      case 'shoe': return 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1f3586ce-7b81-45c6-9405-c2116a5ec967/air-jordan-1-mid-shoes-86f1ZW.png';
      case 'sock': return 'https://assets.adidas.com/images/w_600,f_auto,q_auto/7c9bdfc622db4a7cbf91af1200b0264c_9366/Cushioned_Crew_Socks_3_Pairs_White_HT3446_03_standard.jpg';
      case 'accessory': return 'https://down-ph.img.susercontent.com/file/07629ce80a64a5b64589729a36995269';
      default: return '';
    }
  };

  const PlaceholderIcon = () => (
    <div className="bg-gray-100 border rounded py-7 px-10 flex items-center justify-center">
      <h1 className="text-8xl text-red-500 m-0 p-0">?</h1>
    </div>
  );

  const addToCartAndNavigate = (item, price, type) => {
    if (item) {
      dispatch(addToCheckout({
        ...item,
        quantity: 1,
        price: price,
        size: item.sizes[0]?.size.name,
      }));
    }
    console.log(item, type);
  };

  const handleCheckout = () => {
    addToCartAndNavigate(shoe, prices.shoe, 'shoe');
    addToCartAndNavigate(sock, prices.sock, 'sock');
    addToCartAndNavigate(accessory, prices.accessory, 'accessory');
    navigate("/checkout");
  };

  const isCheckoutDisabled = !Object.values(results).some(item => item);

  return (
    <Grid maxW="1200px" bgColor="gray.100" mx="auto" my="24px" minH="400px" borderRadius="10px" display="flex" pt="40px" px="32px" pb="24px" columnGap="80px">
      <VStack gap="24px" align="start" flexGrow="1">
        <ItemCard item={shoe} type="shoe" />
        <ItemCard item={sock} type="sock" />
        <ItemCard item={accessory} type="accessory" />
      </VStack>
      <Box minW="320px">
        <Text mb="24px" fontSize="32px" fontWeight="semibold">Summary</Text>
        <VStack align="normal" gap="16px">
          <Box borderBottom="solid 1px black" pb="12px">
            <HStack justify="space-between">
              <Text>Subtotal</Text>
              <Text>{convertCurrency(numericSubtotal)}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Shipping</Text>
              <Text>{convertCurrency(numericShippingRate)}</Text>
            </HStack>
          </Box>
          <HStack justify="space-between" borderBottom="solid 1px black" pb="12px">
            <Text>Total</Text>
            <Text>{formattedTotal}</Text>
          </HStack>
          <HStack mt="24px" justify="space-around">
            <button
              disabled={isCheckoutDisabled}
              className='px-9 py-2 font-semibold rounded-full bg-black text-white hover:bg-gray-700 duration-300 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed'
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </HStack>
        </VStack>
      </Box>
    </Grid>
  );
}

export default CustomizeRes;
