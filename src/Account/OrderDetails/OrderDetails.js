import OrderDetailItem from "./OrderDetailItem"
import { useEffect, useState } from "react"
import axios from "axios"

function OrderDetails() {
  const [currUserOrders, setCurrUserOrders] = useState([])
  const user = localStorage.getItem("user")
  const parsedUser = JSON.parse(user)
  useEffect(() => {
    console.log(currUserOrders)
  }, [currUserOrders])

  useEffect(() => {
    axios
      .get(`http://18.223.157.202/backend/api/user/orders`, {
        headers: {
          Authorization: `Bearer ${parsedUser?.token}`,
        },
      })
      .then((res) => {
        const filteredData = res.data.data?.filter(
          (item) => item.items.length > 0
        )
        setCurrUserOrders(filteredData)
      })
  }, [])

  return (
    <main className="pt-8 pe-8 overflow-y-scroll max-h-[800px] flex flex-col gap-3">
      {currUserOrders?.map((item, index) => (
        <OrderDetailItem key={index} orderItems={item} />
      ))}
    </main>
  )
}

export default OrderDetails
