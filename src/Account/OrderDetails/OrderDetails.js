import OrderDetailItem from "./OrderDetailItem"
import { useGetAllProducts } from "../../Shared/Hooks/useGetAllProducts"
import { useEffect } from "react"

function OrderDetails() {
  const { data, loading } = useGetAllProducts()
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <main className="pt-8 pe-8 overflow-y-scroll max-h-[800px] flex flex-col gap-3">
      <OrderDetailItem />
      <OrderDetailItem />
    </main>
  )
}

export default OrderDetails
