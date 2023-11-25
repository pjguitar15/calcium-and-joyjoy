import { Box } from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";

function FilterBar() {
  const filters = [
    {
      main: "Type",
      items: ["Lifestyle", "Running", "Basketball", "Training"],
    },
    {
      main: "Brand",
      items: ["Nike", "Addidas", "Jordan", "Converse"],
    },
    {
      main: "Gender",
      items: ["Men", "Women", "Unisex"],
    },
    {
      main: "Socks",
      items: ["Low", "Mid", "High"],
    },
  ];

  return (
    <Box maxH='80vh' overflowY='auto' pr='24px'>
      {filters.map((f) => (
        <FilterGroup main={f.main} items={f.items} />
      ))}
      {/* <FilterGroup main={"Type"} items={types} /> */}
    </Box>
  );
}

export default FilterBar;
