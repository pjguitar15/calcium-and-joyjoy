import { CheckIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Grid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const colors = [
  "black",
  "red",
  "blue",
  "pink",
  "purple",
  "brown",
  "yellow",
  "green",
];
function ColorFilter() {
  const [selected, setSelected] = useState([]);

  const handleSelect = (color) => {
    if (selected.includes(color))
      setSelected((prev) => prev.filter((c) => c !== color));
    else setSelected((prev) => [...prev, color]);
  };
  return (
    <Accordion allowToggle defaultIndex={[0]}>
      <AccordionItem>
        <AccordionButton>
          <Box fontWeight='semibold' as='span' flex='1' textAlign='left'>
            Colors
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Grid
            mt='8px'
            pr='16px'
            gridTemplateColumns='repeat(4,1fr)'
            columnGap='16px'
            rowGap='8px'
          >
            <Center
              onClick={() => handleSelect("white")}
              cursor='pointer'
              aspectRatio='1/1'
              w='32px'
              bgColor='white'
              borderRadius='10px'
              border='solid .5px black'
            >
              {selected.includes("white") && (
                <CheckIcon stroke='black' color='white' />
              )}
            </Center>
            {colors.map((color) => (
              <Center
                onClick={() => handleSelect(color)}
                cursor='pointer'
                key={color}
                aspectRatio='1/1'
                w='32px'
                bgColor={`${color}`}
                borderRadius='10px'
              >
                {selected.includes(color) && (
                  <CheckIcon stroke='black' color='white' />
                )}
              </Center>
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ColorFilter;
