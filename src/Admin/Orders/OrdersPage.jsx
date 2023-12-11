import React from "react"
import Table from "./Table"

const OrdersPage = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-6">
        Order Management | Orders & Tracking
      </h2>
      <div className="px-7">
        <Table />
      </div>
    </div>
  )
}

export default OrdersPage
