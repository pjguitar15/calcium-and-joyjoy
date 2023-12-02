import { Spinner, VStack } from "@chakra-ui/react";
import CarouselRow from "./CarouselRow";
import { useGetShoes } from "../Shared/Hooks/useShoes";
function Carousels() {
  const { data: shoes, isLoading } = useGetShoes();
  if (isLoading) return <Spinner />;
  return (
    <VStack align='normal' gap='32px'>
      <CarouselRow name={"Shoes"} data={shoes} />
      <CarouselRow name={"Socks"} data={shoes} />
      <CarouselRow name={"Accessories"} data={shoes} />
    </VStack>
  );
}

export default Carousels;
