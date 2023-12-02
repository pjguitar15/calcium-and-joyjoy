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
  CheckboxGroup,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
function FilterGroup({ main, items }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultVal = searchParams.getAll(main)[0]?.split("-");

  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: defaultVal,
  });

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
            <CheckboxGroup value={value}>
              {items.map((filter) => {
                return (
                  <Checkbox
                    colorScheme='yellow'
                    key={filter}
                    {...getCheckboxProps({ value: filter })}
                    value={filter}
                  >
                    {filter}
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default FilterGroup;
