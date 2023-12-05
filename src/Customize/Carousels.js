import { VStack } from "@chakra-ui/react";
import CarouselRow from "./CarouselRow";
import { useGetShoes } from "../Shared/Hooks/useShoes";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSpinner from "../Shared/UI/LoadingSpinner";
import { useQuery } from "react-query";
import axiosInstance from "../Shared/utils/axiosInstance";
function Carousels({ onSelectItems }) {
  const { data: shoes, isLoading } = useGetShoes();
  const { data: mix, isLoading: mixLoading } = useQuery("mix", async () => {
    const res = await axiosInstance.get("/mix-and-match");
    return res.data;
  });

  const [shoe, setShoe] = useState(null);
  const [sock, setSock] = useState(null);
  const [accessory, setAccessory] = useState(null);

  useEffect(() => {
    onSelectItems({ shoe, sock, accessory });
  }, [shoe?.id, sock?.id, accessory?.id]);

  if (isLoading || mixLoading) return <LoadingSpinner />;
  console.log(mix.socks, mix.accessories);
  return (
    <VStack align='normal' gap='32px'>
      <CarouselRow
        name={"Shoes"}
        data={shoes}
        onItemSelect={(shoe) => setShoe(shoe)}
      />
      <CarouselRow
        name={"Socks"}
        data={mix.socks}
        onItemSelect={(sock) => setSock(sock)}
      />
      <CarouselRow
        name={"Accessories"}
        data={mix.accessories}
        onItemSelect={(acc) => setAccessory(acc)}
      />
    </VStack>
  );
}

export default Carousels;
