import { Box } from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";
import ScrollBars from "rc-scrollbars";
import useProductTypes from '../../Shared/Hooks/useProductTypes';
import useCategories from '../../Shared/Hooks/useCategories';
import useBrands from '../../Shared/Hooks/useBrands';

function FilterBar({ onFilterChange }) {
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

  const handleFilterChange = (filterGroup, filterItem) => {
    onFilterChange(filterGroup, filterItem);
  };
  
  return (
    <Box h='80vh' pr='24px'>
      <ScrollBars>
        <FilterGroup main={"Type"} items={mapTypes} onFilterChange={handleFilterChange} />
        <FilterGroup main={"Brands"} items={mapBrands} onFilterChange={handleFilterChange} />
        <FilterGroup main={"Categories"} items={mapCategories} onFilterChange={handleFilterChange} />
        <FilterGroup main={"Genders"} items={["Male", "Female", "Unisex"]} onFilterChange={handleFilterChange} />
      </ScrollBars>
    </Box>
  );
}

export default FilterBar;
