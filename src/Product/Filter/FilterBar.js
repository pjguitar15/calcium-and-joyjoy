import { Box } from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";
import SizesFilter from "./SizesFilter";
import ScrollBars from "rc-scrollbars";

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
    <Box h='70vh' pr='24px'>
      <ScrollBars>
        {filters.map((f) => (
          <FilterGroup key={f.main} main={f.main} items={f.items} />
        ))}
        <SizesFilter />
      </ScrollBars>
      {/* <FilterGroup main={"Type"} items={types} /> */}
    </Box>
  );
}

export default FilterBar;
