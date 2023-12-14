import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import axios from "axios"
import useProductTypes from "../../Shared/Hooks/useProductTypes"

const AdminTypes = () => {
  const [typeInput, setTypeInput] = useState("")
  const [loading, setLoading] = useState(false)
  const { productTypes, setProductTypes } = useProductTypes()
  const baseUrl = "http://18.223.157.202/backend"
  const POST_ENDPOINT = `${baseUrl}/api/admin/product/types/store`
  const DELETE_ENDPOINT = `${baseUrl}/api/admin/product/types/delete/`

  useEffect(() => {
    if (productTypes) console.log(productTypes ?? "")
  }, [])

  const handleSubmit = () => {
    setLoading(true)
    axios
      .post(POST_ENDPOINT, {
        name: typeInput,
      })
      .then((res) => {
        console.log(res)
        setLoading(false)
        setTypeInput("")
        setProductTypes([
          ...productTypes,
          { name: typeInput, id: productTypes.length },
        ])
      })
      .catch((err) => console.log(err))
  }

  const handleDelete = (id) => {
    // console.log(id)
    axios
      .delete(DELETE_ENDPOINT + id)
      .then((res) => {
        console.log(res)
        const filteredData = productTypes.filter((item) => item.id !== id)
        setProductTypes(filteredData)
      })
      .catch((err) => console.log(err))
  }
  return (
    <main
      className="
    container mx-auto"
    >
      <h3 className="text-xl font-semibold">
        Products Management | <span className="text-gray-500">Types</span>
      </h3>
      <div className="my-4">
        <h6 className="font-semibold">Add a type</h6>
        <input
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
          className="rounded-md border border-gray-600 px-3 py-2 w-1/2"
          placeholder="Add a new type"
          type="text"
        />
        <div className="mt-3">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
      <hr />
      <div className="mt-3">
        <h6 className="mb-3 font-semibold">Existing Types</h6>
        <ul className="flex gap-3">
          {productTypes?.map((item, index) => (
            <li
              className="bg-blue-100 text-blue-900 font-semibold rounded-md mb-2 px-4 py-2 flex items-center"
              key={index}
            >
              {item.name}
              <IoClose
                onClick={() => handleDelete(item.id)}
                className="white hover:text-red-500 duration-300 cursor-pointer text-md ms-2"
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default AdminTypes
