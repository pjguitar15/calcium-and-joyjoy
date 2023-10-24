import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function ItemCard(props) {
  const { cardW, img, title, discount } = props;
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
        <CardHeader fontWeight='semibold' color='red'>
          SALE -{discount * 100}%
        </CardHeader>
      )}
      <CardBody>
        <Image
          mx='auto'
          src={img}
          verticalAlign='bottom'
          mb='16px'
          maxH='200px'
        />
        <Text fontWeight='semibold'>{title}</Text>
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
