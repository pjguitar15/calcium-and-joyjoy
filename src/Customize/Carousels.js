import { VStack } from "@chakra-ui/react"
import CarouselRow from "./CarouselRow"
import { useState, useEffect } from "react"
import LoadingSpinner from "../Shared/UI/LoadingSpinner"
import { useQuery } from "react-query"
import axiosInstance from "../Shared/utils/axiosInstance"
import { useGetAccessories } from '../Shared/Hooks/useGetAccessories'

function Carousels({ onSelectItems }) {
  const { accessoriesData } = useGetAccessories()

  useEffect(() => {
    console.log(accessoriesData)
  }, [accessoriesData])

  const { data: mix, isLoading } = useQuery("mix", async () => {
    // /api/admin/products
    const res = await axiosInstance.get("/mix-and-match")
    console.log("Data", res.data)
    return res.data
  })

  const [shoe, setShoe] = useState(null)
  const [sock, setSock] = useState(null)
  const [accessory, setAccessory] = useState(null)

  useEffect(() => {
    onSelectItems({ shoe, sock, accessory })
    // console.log(sock)
  }, [shoe?.id, sock?.id, accessory?.id])

  if (isLoading) return <LoadingSpinner />

  return (
    <VStack align="normal" gap="32px">
      <CarouselRow
        name="Shoes"
        data={mix.shoes}
        onItemSelect={(shoe) => setShoe(shoe)}
      />
      <CarouselRow
        name="Socks"
        data={mix.socks}
        onItemSelect={(sock) => setSock(sock)}
      />
      <CarouselRow
        name="Accessories"
        data={accessoriesData}
        onItemSelect={(acc) => setAccessory(acc)}
      />
    </VStack>
  )
}

export default Carousels
