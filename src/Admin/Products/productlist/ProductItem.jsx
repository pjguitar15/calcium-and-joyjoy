import { IoCloseCircleOutline } from "react-icons/io5";
import DeleteItemModal from "./DeleteItemModal";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axiosInstance from "../../../Shared/utils/axiosInstance";

const ProductItem = (props) => {
  console.log("Product Item Props:", props.item);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const id = props.item.id;

  const renderTypes = () => {
    if (!props.item.types || props.item.types.length === 0) {
      return 'No Types';
    }
  
    // Map over the types array and access the name of each nested type object
    return props.item.types.map((typeObject) => typeObject.type.name).join(', ');
  };

  const renderBrandName = () => {
    return props.item.brand ? props.item.brand.name : 'No Brand';
  };

  const renderCategoryName = () => {
    return props.item.category ? props.item.category.name : 'No Category';
  };

  const renderColors = () => {
    return props.item.colors && props.item.colors.length > 0 
      ? props.item.colors.map((item) => `${item.color.name}, `) 
      : 'No Colors';
  };

  const renderSizes = () => {
    return props.item.sizes && props.item.sizes.length > 0 
      ? props.item.sizes.map((item) => `${item.size.name}, `) 
      : 'No Sizes';
  };


  const onCancel = () => {
    setShowModal(false);
  };

  const onConfirm = () => {
    setLoading(true);
    axiosInstance
      .delete(`/admin/products/delete/${id}`) // Using axiosInstance with relative URL
      .then((res) => {
        console.log(res);
        setShowModal(false);
        props.removeItemFromData(id);
        toast({
          title: "Item deleted",
          description: "Deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="border shadow-lg rounded-lg overflow-hidden">
      {showModal && (
        <DeleteItemModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          loading={loading}
        />
      )}
      <div className="relative">
        <img
          src={
            props.item.image ||
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6ed5b87e-67b1-4f31-810c-427b3490794d/cortez-shoes-0VH7qz.png" 
          }
          alt=""
          className="w-full h-64 object-cover"
        />
        <IoCloseCircleOutline
          onClick={() => setShowModal(true)}
          className="text-2xl absolute top-3 right-3 hover:text-red-500 cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-xl font-semibold mb-2">{props.item.name}</h3>
        <h6 className="text-sm">Price: P{props.item.price}</h6>
        <h6 className="text-sm">Brand: {renderBrandName()}</h6>
        <h6 className="text-sm">Type: {renderTypes()}</h6>
        <h6 className="text-sm">Category: {renderCategoryName()}</h6>
        <h6 className="text-sm capitalize">Gender: {props.item.gender}</h6>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h6 className="text-sm font-semibold">Variants:</h6>
        <h6 className="text-sm">Color: {renderColors()}</h6>
        <h6 className="text-sm">Size: {renderSizes()}</h6>
      </div>
    </div>
  );
};

export default ProductItem;
