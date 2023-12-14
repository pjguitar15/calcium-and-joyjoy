import React, { useRef } from "react"

const ChangeAddressModal = ({
  allAddresses,
  autoFilledData,
  setAutoFilledData,
  onModalConfirm,
  onCancel,
}) => {
  const modalRef = useRef()
  const handleOutsideClick = (event) => {
    // Check if the clicked element is outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel() // Close the modal
    }
  }

  const AddressItem = ({ item, setAutoFilledData, currentId }) => {
    /* 
      <Text fontSize='xl' fontWeight='bold'>{item.label}</Text>
                  <Divider borderColor='gray.300'/>
                  <Text fontSize='lg'>{item.street_address}, {item.building_address}</Text>
                  <Text fontSize='lg'>{item.city_municipality}, {item.barangay}, {item.postal_code}</Text>
    */
    return (
      <div className="p-5 border border-gray-300 rounded-md bg-white flex gap-3">
        <div
          onClick={() => {
            if (currentId !== item.id) {
              setAutoFilledData(item)
            }
          }}
          className="w-6 h-6 border-2 border-orange-500 rounded-full mt-1 flex items-center justify-center cursor-pointer"
        >
          {currentId === item.id && (
            <div className="bg-orange-500 rounded-full w-2 h-2"></div>
          )}
        </div>
        <p className="text-gray-600 m-0 p-0">
          {item.label}, {item.street_address}, {item.building_address},{" "}
          {item.city_municipality}, {item.barangay}, {item.postal_code}
        </p>
      </div>
    )
  }
  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
    >
      <div ref={modalRef} className="bg-gray-100 w-96 p-6 rounded border">
        <h2 className="text-2xl font-bold mb-4">Change Address</h2>

        <div className="flex flex-col gap-2">
          {allAddresses.map((item, index) => (
            <AddressItem
              key={index}
              item={item}
              setAutoFilledData={setAutoFilledData}
              currentId={autoFilledData.id}
            />
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onModalConfirm}
            className="px-4 py-2 bg-yellow-500 text-white rounded focus:outline-none disabled:opacity-25"
          >
            Back to checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeAddressModal
