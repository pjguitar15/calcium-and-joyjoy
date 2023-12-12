import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import convertCurrency from "../Shared/utils/convertCurrency"
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
function CustomizeRes({ results }) {
  const [shoePrice, setShoePrice] = useState(0)
  const [sockPrice, setSockPrice] = useState(0)
  const [accessoryPrice, setAccessoryPrice] = useState(0)
  const navigate = useNavigate()

  const { shoe, sock, accessory } = results

  useEffect(() => {
    if (shoe) setShoePrice(Number(shoe.price))
    if (sock) setSockPrice(Number(sock.price))
    if (accessory) setAccessoryPrice(Number(accessory.price))

    if (!shoe) setShoePrice(0)
    if (!sock) setSockPrice(0)
    if (!accessory) setAccessoryPrice(0)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [shoe, sock, accessory])
  return (
    <Grid
      maxW="1200px"
      bgColor="gray.100"
      mx="auto"
      my="24px"
      minH="400px"
      borderRadius="10px"
      display="flex"
      // gridTemplateColumns='6fr 4fr'
      pt="40px"
      px="32px"
      pb="24px"
      columnGap="80px"
    >
      <VStack gap="24px" align="start" flexGrow="1">
        <HStack w="100%" justify="space-between">
          <Box>
            <HStack gap="16px">
              <Center
                borderRadius="10px"
                maxW="160px"
                aspectRatio="1/1"
                overflow="hidden"
                border="solid 1.6px black"
              >
                {shoe?.name ? (
                  <Image
                    src={shoe?.image || "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/1f3586ce-7b81-45c6-9405-c2116a5ec967/air-jordan-1-mid-shoes-86f1ZW.png"}
                    alt="shoe"
                    maxW="160px"
                  />
                ) : (
                  <div className="bg-gray-100 border rounded py-7 px-10 flex items-center justify-center">
                    <h1 className="text-8xl text-red-500 m-0 p-0">?</h1>
                  </div>
                )}
              </Center>

              <Box>
                <Text fontWeight="semibold">
                  {shoe?.name || "No shoe selected"}
                </Text>
                <Text opacity=".7">
                  {shoe?.name ? "Shoes" : "Please select a shoe below"}
                </Text>
              </Box>
            </HStack>
          </Box>
          <Text>{convertCurrency(shoePrice)}</Text>
        </HStack>
        <HStack w="100%" justify="space-between">
          <Box>
            <HStack gap="16px">
              <Center
                borderRadius="10px"
                maxW="160px"
                aspectRatio="1/1"
                overflow="hidden"
                border="solid 1.6px black"
              >
                {sock?.name ? (
                  <Image
                    src={sock?.image || `https://assets.adidas.com/images/w_600,f_auto,q_auto/7c9bdfc622db4a7cbf91af1200b0264c_9366/Cushioned_Crew_Socks_3_Pairs_White_HT3446_03_standard.jpg`}

                    alt="shoe"
                    maxW="160px"
                  />
                ) : (
                  <div className="bg-gray-100 border rounded py-7 px-10 flex items-center justify-center">
                    <h1 className="text-8xl text-red-500 m-0 p-0">?</h1>
                  </div>
                )}
              </Center>
              <Box>
                <Text fontWeight="semibold">
                  {sock?.name || "No socks selected"}
                </Text>
                <Text opacity=".7">
                  {sock?.name ? "Socks" : "Please select a sock below"}
                </Text>
              </Box>
            </HStack>
          </Box>
          <Text>{convertCurrency(sockPrice)}</Text>
        </HStack>
        <HStack w="100%" justify="space-between">
          <Box>
            <HStack gap="16px">
              <Center
                borderRadius="10px"
                maxW="160px"
                aspectRatio="1/1"
                overflow="hidden"
                border="solid 1.6px black"
              >
                {accessory?.name ? (
                  <Image
                    src={accessory?.image || `https://down-ph.img.susercontent.com/file/07629ce80a64a5b64589729a36995269`}
                    alt="sock"
                    maxW="160px"
                  />
                ) : (
                  <div className="bg-gray-100 border rounded py-7 px-10 flex items-center justify-center">
                    <h1 className="text-8xl text-red-500 m-0 p-0">?</h1>
                  </div>
                )}
              </Center>
              <Box>
                <Text fontWeight="semibold">
                  {accessory?.name || "No accessory selected"}
                </Text>
                <Text opacity=".7">
                  {accessory?.name
                    ? "Accessory"
                    : "Please select an accessory below"}
                </Text>
              </Box>
            </HStack>
          </Box>
          <Text>{convertCurrency(accessoryPrice)}</Text>
        </HStack>
      </VStack>
      <Box minW="320px">
        <Text mb="24px" fontSize="32px" fontWeight="semibold">
          Summary
        </Text>
        <VStack align="normal" gap="16px">
          <Box borderBottom="solid 1px black" pb="12px">
            <HStack justify="space-between">
              <Text>Subtotal</Text>
              <Text>
                {convertCurrency(shoePrice + sockPrice + accessoryPrice)}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Shipping</Text>
              <Text>{convertCurrency(300)}</Text>
            </HStack>
          </Box>
          <HStack
            justify="space-between"
            borderBottom="solid 1px black"
            pb="12px"
          >
            <Text>Total</Text>
            <Text>
              {convertCurrency(shoePrice + sockPrice + accessoryPrice + 300)}
            </Text>
          </HStack>
          <HStack mt="24px" justify="space-around">
            <button
              disabled={!shoe || !accessory || !sock}
              className='px-9 py-2 font-semibold rounded-full bg-black text-white hover:bg-gray-700 duration-300 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed'
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
            {/* <Button
              borderRadius="20px"
              bgColor="black"
              color="white"
              px="32px"
              py="16px"
            >
              Add to cart
            </Button> */}
          </HStack>
        </VStack>
      </Box>
    </Grid>
  )
}

export default CustomizeRes
