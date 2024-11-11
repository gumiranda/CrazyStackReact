import { Box, Button, Input, List } from "@chakra-ui/react";
import { useState } from "react";

export const AutoComplete = (props) => {
  const {
    label,
    error,
    labelColor = "gray.800",
    inputBgColor = "gray.800",
    autoCompleteProps,
    onChange,
    ...rest
  } = props;
  const {
    list = [], // lista de sugestões [{ value, label }]
    placeholder = "",
    listStyleProps = {},
    listItemStyleProps = {},
    highlightItemBg = "gray.200",
  } = autoCompleteProps || {};
  const inputProps = { ...rest, color: labelColor, placeholder };
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const openChange = (e) => {
    onChange(e);
    const value = e.target.value;
    // Filtra sugestões conforme o texto do input
    const filtered = list.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSuggestionsOpen(true);
  };
  const handleInputChange = (e) => {
    onChange(e);
    const value = e.target.value;

    const filtered = list.filter((suggestion) =>
      suggestion.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSuggestionsOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    handleInputChange({ target: { value: suggestion?.label } });
    setFilteredSuggestions([]);
    if (listItemStyleProps?.onClick) {
      listItemStyleProps?.onClick?.(suggestion);
    }
  };
  return (
    <>
      <Box position="relative">
        <Input {...inputProps} onChange={openChange} />
        {suggestionsOpen && filteredSuggestions.length > 0 && (
          <List.Root
            position="absolute"
            width="100%"
            mt="1"
            border="1px solid #e2e8f0"
            borderRadius="md"
            boxShadow="sm"
            listStyle={"none"}
            zIndex="1"
            {...listStyleProps}
          >
            {filteredSuggestions.map((suggestion: any, index) => (
              <Button
                onClick={() => handleSuggestionClick(suggestion)}
                asChild
                key={suggestion.value}
              >
                <List.Item
                  key={index}
                  padding="8px"
                  cursor="pointer"
                  _hover={{ backgroundColor: highlightItemBg }}
                  {...listItemStyleProps}
                >
                  {suggestion.label}
                </List.Item>
              </Button>
            ))}
          </List.Root>
        )}
      </Box>
    </>
  );
};
