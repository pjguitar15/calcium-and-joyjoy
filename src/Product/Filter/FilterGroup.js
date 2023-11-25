import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Checkbox,
  useCheckboxGroup,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
function FilterGroup({ main, items }) {
  const { value, getCheckboxProps } = useCheckboxGroup();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (value.length > 0) {
      searchParams.set(main, value.join("-"));
      setSearchParams(searchParams);
    } else {
      searchParams.delete(main);
      setSearchParams(searchParams);
    }
  }, [value]);
  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem borderTop='none'>
        <AccordionButton>
          <Box fontWeight='semibold' as='span' flex='1' textAlign='left'>
            {main}
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb='8px'>
          <VStack align='normal'>
            {items.map((filter) => {
              return (
                <Checkbox
                  colorScheme='yellow'
                  key={filter}
                  {...getCheckboxProps({ value: filter })}
                >
                  {filter}
                </Checkbox>
              );
            })}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterGroup;
