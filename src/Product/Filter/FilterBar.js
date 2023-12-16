import { Box } from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";
import SizesFilter from "./SizesFilter";
import ScrollBars from "rc-scrollbars";
import ColorFilter from "./ColorFilter";
import useProductTypes from '../../Shared/Hooks/useProductTypes';
import useCategories from '../../Shared/Hooks/useCategories';
import useBrands from '../../Shared/Hooks/useBrands';

function FilterBar() {
  const { productTypes } = useProductTypes()
  const { categories } = useCategories()
  const { brands } = useBrands()


  const mapTypes = productTypes?.map((item) => {
    return item.name
  })
  const mapCategories = categories?.map((item) => {
    return item.name
  })
  const mapBrands = brands?.map((item) => {
    return item.name
  })
  const filters = [
    {
      main: "Type",
      items: ["Lifestyle", "Running", "Basketball", "Training"],
    },
    {
      main: "Brand",
      items: ["Nike", "Adidas", "Jordan", "Converse"],
    },
    {
      main: "Gender",
      items: ["Male", "Female", "Unisex"],
    },
    {
      main: "Socks",
      items: ["Low", "Mid", "High"],
    },
    {
      main: "Price",
      items: [
        "Under ₱5,000",
        "₱5,000-₱9,000",
        "₱9,000-₱10,000",
        "Over ₱10,000",
      ],
    },
  ];

  return (
    <Box h='80vh' pr='24px'>
      <ScrollBars>
        <FilterGroup main={"Type"} items={mapTypes} />
        <FilterGroup main={"Brands"} items={mapBrands} />
        <FilterGroup main={"Categories"} items={mapCategories} />
        <FilterGroup main={"Genders"} items={["Male", "Female", "Unisex"]} />
        <FilterGroup main={"Price"} items={[
          "Under ₱5,000",
          "₱5,000-₱9,000",
          "₱9,000-₱10,000",
          "Over ₱10,000",
        ]} />

        <SizesFilter />
        <ColorFilter />
      </ScrollBars>
      {/* <FilterGroup main={"Type"} items={types} /> */}
    </Box>
  );
}

export default FilterBar;
