import React, { useEffect, useState } from "react"
import useCategories from "../../Shared/Hooks/useCategories"
import { IoClose } from "react-icons/io5"
import axios from "axios"

const AdminCategories = () => {
  const [categoryInput, setCategoryInput] = useState("")
  const [loading, setLoading] = useState(false)
  const { categories, setCategories } = useCategories()
  const baseUrl = "http://18.223.157.202/backend"
  const POST_ENDPOINT = `${baseUrl}/api/admin/product/categories/store`
  const DELETE_ENDPOINT = `${baseUrl}/api/admin/product/categories/delete/`

  useEffect(() => {
    if (categories) console.log(categories ?? "")
  }, [])

  const handleSubmit = () => {
    setLoading(true)
    axios
      .post(POST_ENDPOINT, {
        name: categoryInput,
      })
      .then((res) => {
        console.log(res)
        setLoading(false)
        setCategoryInput("")
        setCategories([
          ...categories,
          { name: categoryInput, id: categories.length },
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
        const filteredData = categories.filter((item) => item.id !== id)
        setCategories(filteredData)
      })
      .catch((err) => console.log(err))
  }
  return (
    <main
      className="
    container mx-auto"
    >
      <h3 className="text-xl font-semibold">
        Products Management | <span className="text-gray-500">Categories</span>
      </h3>
      <div className="my-4">
        <h6 className="font-semibold">Add a category</h6>
        <input
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="rounded-md border border-gray-600 px-3 py-2 w-1/2"
          placeholder="Add a new category"
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
        <h6 className="mb-3 font-semibold">Existing Categories</h6>
        <ul className="flex gap-3">
          {categories?.map((item, index) => (
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

export default AdminCategories
