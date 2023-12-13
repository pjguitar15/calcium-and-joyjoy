import { IoCloseCircleOutline } from "react-icons/io5"
import DeleteItemModal from "./DeleteItemModal"
import { useEffect, useState } from "react"
import axios from "axios"
import { useToast } from "@chakra-ui/react"

const ProductItem = (props) => {
  const [showModal, setShowModal] = useState(false)
  const toast = useToast()
  const id = props.item.id
  const onCancel = () => {
    setShowModal(false)
  }

  console.log(id)

  const onConfirm = () => {
    axios
      .delete(`http://18.223.157.202/backend/api/admin/products/delete/${id}`)
      .then((res) => {
        console.log(res)
        setShowModal(false)
        toast({
          title: "Item successfully deleted",
          description: "Going back to home page",
          status: "danger",
          position: "top",
        })
      })
  }
  return (
    <div className="border shadow-lg rounded-lg">
      {showModal && (
        <DeleteItemModal onCancel={onCancel} onConfirm={onConfirm} />
      )}
      <div className="w-100 relative">
        <img
          src={
            props.item.image ||
            "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5ab0a6c-6393-4af6-abbc-4f1acaa6ed94/air-max-dawn-shoes-tx7TpB.png"
          }
          alt=""
        />
        <IoCloseCircleOutline
          onClick={() => setShowModal(true)}
          className="text-2xl absolute top-3 right-3 hover:text-red-500 hover:scale-105 hover:text-white hover:bg-red-500 hover:rounded-full cursor-pointer duration-200"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        {/* Product Information */}
        <h3 className="text-xl font-semibold mb-2">{props.item.name}</h3>
        <h6 className="text-sm">Price: P{props.item.price}</h6>
        <h6 className="text-sm">Brand: {props.item.brand.name}</h6>
        <h6 className="text-sm">Type: Lifestyle</h6>
        <h6 className="text-sm capitalize">Gender: {props.item.gender}</h6>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h6 className="text-sm font-semibold">Variants:</h6>
        <h6 className="text-sm">
          Color: {props.item.colors.map((item) => `${item.color.name}, `)}
        </h6>
        <h6 className="text-sm">
          Size: {props.item.sizes.map((item) => `${item.size.name}, `)}
        </h6>
      </div>
    </div>
  )
}

export default ProductItem
