import React, { useRef } from "react"

const DeleteItemModal = ({ onCancel, onConfirm }) => {
  const modalRef = useRef()

  const handleOutsideClick = (event) => {
    // Check if the clicked element is outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel() // Close the modal
    }
  }
  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
    >
      <div ref={modalRef} className="bg-white w-96 p-6 rounded border">
        <h2 className="text-2xl font-bold mb-4">Delete Item</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item permanently?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 text-gray-600 border rounded focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteItemModal
