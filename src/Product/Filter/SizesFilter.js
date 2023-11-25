import { Box, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];
function SizesFilter() {
  const [selected, setSelected] = useState([7]);

  const [searchParams, setSeachParams] = useSearchParams();

  const handleSelect = (size) => {
    if (selected.includes(size)) {
      setSelected((prev) => prev.filter((s) => s !== size));
    } else {
      setSelected((prev) => [...prev, size]);
    }
  };

  console.log(selected);
  return (
    <Grid mt='8px' gridTemplateColumns='repeat(3,1fr)' gap='8px'>
      {sizes.map((s) => (
        <Box
          textAlign='center'
          key={s}
          px='8x'
          py='2px'
          border='solid 1px black'
          borderRadius='5px'
          opacity={selected.includes(s) ? 1 : 0.3}
          onClick={() => handleSelect(s)}
          cursor='pointer'
        >
          {s}
        </Box>
      ))}
    </Grid>
  );
}

export default SizesFilter;
