import { VStack } from "@chakra-ui/react"
import CarouselRow from "./CarouselRow"
import { useState, useEffect } from "react"
import LoadingSpinner from "../Shared/UI/LoadingSpinner"
import { useQuery } from "react-query"
import axiosInstance from "../Shared/utils/axiosInstance"
import { useLocation } from "react-router-dom"

function Carousels({ onSelectItems }) {
  const { data: mix, isLoading } = useQuery("mix", async () => {
    const res = await axiosInstance.get("/mix-and-match")
    return res.data
  })

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search)

  const [filteredShoes, setFilteredShoes] = useState([])
  const [shoe, setShoe] = useState(null)
  const [sock, setSock] = useState(null)
  const [accessory, setAccessory] = useState(null)
  const [selectedFilterTypes, setSelectedFilterTypes] = useState(() =>
    (queryParameters.get("Type") || "").split("-")
  )

  useEffect(() => {
    if (selectedFilterTypes.length > 0) {
      setFilteredShoes(
        (mix?.shoes || []).filter((item) =>
          item.types.some(({ type }) => selectedFilterTypes.includes(type.name))
        )
      )
    } else {
      setFilteredShoes(mix?.shoes || [])
    }
  }, [mix, selectedFilterTypes])

  useEffect(() => {
    const typeInString = queryParameters.get("Type")
    if (typeInString) {
      setSelectedFilterTypes(typeInString.split("-"))
    }
  }, [queryParameters])

  useEffect(() => {
    onSelectItems({ shoe, sock, accessory })
  }, [shoe?.id, sock?.id, accessory?.id])

  if (isLoading) return <LoadingSpinner />

  return (
    <VStack align="normal" gap="32px">
      <CarouselRow
        name="Shoes"
        data={filteredShoes}
        onItemSelect={(shoe) => setShoe(shoe)}
      />
      <CarouselRow
        name="Socks"
        data={mix.socks}
        onItemSelect={(sock) => setSock(sock)}
      />
      <CarouselRow
        name="Accessories"
        data={mix.accessories}
        onItemSelect={(acc) => setAccessory(acc)}
      />
    </VStack>
  )
}

export default Carousels
