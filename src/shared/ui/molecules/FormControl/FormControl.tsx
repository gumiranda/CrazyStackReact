/* eslint-disable react/no-children-prop */
import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import { CUIAutoComplete } from "./AutoComplete";
const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
];
import {
  FormLabel,
  FormControl as FormControlChakra,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { Input } from "shared/ui";
interface InputProps extends ChakraInputProps {
  name: string;
  bgColorHover?: string;
  label?: string;
  error?: any;
  autoCompleteProps?: any;
}
const FormControlMolecules: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    size = "lg",
    focusBorderColor = "green.500",
    variant = "filled",
    bgColor = "purple.900",
    bgColorHover = "purple.900",
    label,
    error = null,
    autoCompleteProps = null,
    ...rest
  },
  ref
) => {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleSelectedItemsChange = (selectedItems: any) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };
  const AutoComplete = CUIAutoComplete as (props: any) => React.ReactNode;

  return (
    <FormControlChakra {...rest} data-testid="FormControlTestId" isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {!autoCompleteProps ? (
        <>
          <Input
            id={name}
            name={name}
            focusBorderColor={focusBorderColor}
            bgColor={bgColor}
            variant={variant}
            _hover={{ bgColor: bgColorHover }}
            ref={ref}
            size={size}
            {...rest}
          />
        </>
      ) : (
        <AutoComplete
          label={label}
          renderInput={(props: any) => (
            <Input
              id={name}
              name={name}
              focusBorderColor={focusBorderColor}
              bgColor={bgColor}
              variant={variant}
              _hover={{ bgColor: bgColorHover }}
              ref={ref}
              size={size}
              {...rest}
              {...props}
            />
          )}
          ref={ref}
          disableCreateItem
          placeholder="Type a Country"
          items={pickerItems}
          listStyleProps={{
            bgColor: "purple.900",
            color: "white",
          }}
          listItemStyleProps={{
            bgColor: "purple.900",
            color: "white",
          }}
          highlightItemBg="purple.700"
          selectedItems={selectedItems}
          onSelectedItemsChange={(changes: any) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
      )}

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControlChakra>
  );
};
export const FormControl = memo(forwardRef(FormControlMolecules));
