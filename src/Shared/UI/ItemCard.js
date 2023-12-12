import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import config from "../utils/config";
import LoadingSpinner from "./LoadingSpinner";
import convertCurrency from "../utils/convertCurrency";

function ItemCard(props) {
  const { cardW, data, variant, onSelect, isSelected, category } = props;
  const currCategory = props.data.category?.name


  const { pathname } = useLocation();

  if (!data) return <LoadingSpinner />;

  const { name, image, price, gender, discount, id } = data;
  const maxLength = 21;
  const formattedName =
    name.trim().length > maxLength ? name.slice(0, maxLength) + "..." : name;

  const clickHandler = () => {
    if (pathname !== "/customize") return;
    onSelect(data);
  };

  return (
    <Card
      onClick={clickHandler}
      py='8px'
      boxShadow='4px 4px 16px rgba(0,0,0,.3)'
      w={cardW || "250px"}
      mx='auto'
      cursor='pointer'
      transition='all .4s'
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "4px 8px 16px rgba(0,0,0,.4)",
      }}
      as={pathname !== "/customize" ? Link : Card}
      to={`/shoe/${id}`}
      borderRadius='20px'
      h='400px'
      bgColor={isSelected ? "var(--accent)" : ""}
    >
      {discount && (
        <CardHeader color='white' pos='relative' mt='-8px'>
          <Box
            w='fit-content'
            pos='absolute'
            right='24px'
            top='0'
            bgColor='#F24E1E'
            px='4px'
            py='12px'
            clipPath='polygon(100% 0, 100% 100%, 50% 80%, 0 100%, 0 0)'
            fontSize='14px'
          >
            {discount * 100}%
          </Box>
        </CardHeader>
      )}
      <CardBody>
        <Box display='flex' alignItems='center' alignContent='center' h='200px'>
          <Image
            alt='product'
            mx='auto'
            src={currCategory === "Shoes" ? props.data.image || `https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/63c77c04dc6448548ccbae880189e107_9366/Galaxy_6_Shoes_Black_GW3848_01_standard.jpg` : currCategory === "Socks" ? props.data.image || "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/09c97c11-0b67-4050-bbd1-e68fb4afaffa/everyday-lightweight-training-ankle-socks-ShtJfk.png" : "https://dynamic.zacdn.com/nLumc8muHbA7DQF8OHMK_53zMYo=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/nike-0523-8134002-1.jpg"}

            verticalAlign='bottom'
            mb='16px'
            maxH='200px'
            // h='200px'
            borderRadius='10px'
          />
        </Box>
        <Text fontWeight='semibold'>{formattedName}</Text>

        <Text color='gray.500'>
          {gender === "male" ? "Men's" : "Women's"}{" "}
          {variant === "shoe" ? "shoes" : "accessory"}
        </Text>

        {discount ? (
          <HStack>
            <Text color='red' fontWeight='semibold'>
              {convertCurrency(price * 0.1)}
            </Text>
            <Text my='16px' textDecor='line-through' fontWeight='semibold'>
              {convertCurrency(price)}
            </Text>
          </HStack>
        ) : (
          <Text my='16px' fontWeight='semibold'>
            {convertCurrency(price)}
          </Text>
        )}

        <HStack color='goldenrod'>
          <StarIcon />
          <Text>5.0</Text>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
