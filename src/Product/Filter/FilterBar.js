import { Box } from "@chakra-ui/react";
import FilterGroup from "./FilterGroup";
import SizesFilter from "./SizesFilter";
import ScrollBars from "rc-scrollbars";
import ColorFilter from "./ColorFilter";

function FilterBar() {
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
      items: ["Men", "Women", "Unisex"],
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
        {filters.map((f) => (
          <FilterGroup key={f.main} main={f.main} items={f.items} />
        ))}
        <SizesFilter />
        <ColorFilter />
      </ScrollBars>
      {/* <FilterGroup main={"Type"} items={types} /> */}
    </Box>
  );
}

export default FilterBar;
