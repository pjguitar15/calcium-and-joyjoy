const ProductItem = (props) => {
  // useEffect(() => {
  //   console.log(props.price)
  // }, [props])
  return (
    <div className="border shadow-lg rounded-lg">
      <div className="w-100">
        <img
          src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b5ab0a6c-6393-4af6-abbc-4f1acaa6ed94/air-max-dawn-shoes-tx7TpB.png"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        {/* Product Information */}
        <h3 className="text-xl font-semibold mb-2">{props.item.name}</h3>
        <h6 className="text-sm">Price: {props.item.price}</h6>
        <h6 className="text-sm">Brand: {props.item.brand.name}</h6>
        <h6 className="text-sm">Type: Lifestyle</h6>
        <h6 className="text-sm">Gender: {props.item.gender}</h6>
        <h6 className="text-sm">Stocks: No data</h6>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h6 className="text-sm font-semibold">Variants:</h6>
        <h6 className="text-sm">
          Color: {props.item.colors.map((item) => `${item.color.name}, `)}
        </h6>
        <h6 className="text-sm">
          Size: {props.item.sizes.map((item) => `${item.size.name}, `)}
        </h6>
        <h6 className="text-sm">Materials: No data</h6>
      </div>
    </div>
  )
}

export default ProductItem
