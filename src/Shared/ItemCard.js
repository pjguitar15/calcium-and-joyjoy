import { StarIcon } from "@chakra-ui/icons";
import { Card, CardBody, HStack, Image, Text } from "@chakra-ui/react";
function ItemCard(props) {
  const { img, title } = props;
  return (
    <Card
      py='8px'
      boxShadow='4px 4px 16px rgba(0,0,0,.3)'
      maxW='280px'
      mx='auto'
    >
      <CardBody>
        <Image mx='auto' src={img} w='200px' h='200px' mb='32px' />
        <Text fontWeight='semibold'>Air Force {title} White</Text>
        <Text color='gray.300'>Men/Women's Shoes</Text>
        <Text my='24px' fontWeight='semibold'>
          P5,495
        </Text>
        <HStack color='goldenrod'>
          <StarIcon />
          <Text>5.0</Text>
        </HStack>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
