import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
} from "@chakra-ui/react";

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
            <Box
              cursor='pointer'
              border='solid 1px black'
              aspectRatio='1/1'
              w='32px'
              bgColor='white'
              borderRadius='10px'
            />
            {colors.map((color) => (
              <Box
                cursor='pointer'
                key={color}
                aspectRatio='1/1'
                w='32px'
                bgColor={`${color}`}
                borderRadius='10px'
              />
            ))}
          </Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default ColorFilter;
