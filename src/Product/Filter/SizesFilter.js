import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProductSizes from '../../Shared/Hooks/useProductSizes';

function SizesFilter() {
  const [selected, setSelected] = useState([]);
  const { productSizes } = useProductSizes()
  const mapSizes = productSizes?.map((item) => item.name)

  const [searchParams, setSeachParams] = useSearchParams();

  const handleSelect = (size) => {
    if (selected.includes(size)) {
      setSelected((prev) => prev.filter((s) => s !== size));
    } else {
      setSelected((prev) => [...prev, size]);
    }
  };

  useEffect(() => {
    if (selected.length < 1) {
      searchParams.delete("sizes");
      setSeachParams(searchParams);
    } else {
      searchParams.set("sizes", selected.join("-"));
      setSeachParams(searchParams);
    }
  }, [selected]);

  return (
    <Accordion allowToggle defaultIndex={[0]}>
      <AccordionItem>
        <AccordionButton>
          <Box fontWeight='semibold' as='span' flex='1' textAlign='left'>
            Sizes
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Grid
            mt='8px'
            gridTemplateColumns='repeat(3,1fr)'
            gap='8px'
            pr='16px'
          >
            {mapSizes.map((s) => (
              <Box
                textAlign='center'
                key={s}
                px='8x'
                py='2px'
                border='solid 1px black'
                borderColor={selected.includes(s) ? "var(--accent)" : ""}
                borderRadius='5px'
                // opacity={selected.includes(s) ? 1 : 0.3}
                onClick={() => handleSelect(s)}
                cursor='pointer'
                filter={
                  selected.includes(s)
                    ? "drop-shadow(1px 1px 2px var(--accent))"
                    : ""
                }
              >
                {s}
              </Box>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default SizesFilter;
