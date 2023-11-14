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
import { Link } from "react-router-dom";
import config from "../utils/config";
function ItemCard(props) {
  const { cardW, data } = props;
  const { name, image, price, gender, discount } = data;
  const maxLength = 21;
  const formattedName =
    name.trim().length > maxLength ? name.slice(0, maxLength) + "..." : name;

  return (
    <Card
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
      as={Link}
      to='/shoe/1'
      borderRadius='20px'
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
        <Image
          mx='auto'
          src={`${config.apiUrl}/storage/${image}`}
          verticalAlign='bottom'
          mb='16px'
          // maxH='200px'
          h='200px'
        />
        <Text fontWeight='semibold'>{formattedName}</Text>
        <Text color='gray.500'>Men/Women's Shoes</Text>
        {discount && (
          <HStack>
            <Text color='red' fontWeight='semibold'>
              &#8369;{5495 * 0.1}
            </Text>
            <Text my='16px' textDecor='line-through' fontWeight='semibold'>
              &#8369;5,495
            </Text>
          </HStack>
        )}
        {!discount && (
          <Text my='16px' fontWeight='semibold'>
            &#8369;5,495
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
