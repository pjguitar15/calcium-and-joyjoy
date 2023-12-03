import { VStack } from "@chakra-ui/react";
import CarouselRow from "./CarouselRow";
import { useGetShoes } from "../Shared/Hooks/useShoes";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
function Carousels({ onSelectItems }) {
  const { data: shoes, isLoading } = useGetShoes();
  const [shoe, setShoe] = useState(null);
  const [sock, setSock] = useState(null);
  const [lace, setLace] = useState(null);

  useEffect(() => {
    onSelectItems({ shoe, sock, lace });
  }, [shoe?.id]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <VStack align='normal' gap='32px'>
      <CarouselRow
        name={"Shoes"}
        data={shoes}
        onItemSelect={(shoe) => setShoe(shoe)}
      />
    </VStack>
  );
}

export default Carousels;
