import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import {
  FormLabel,
  FormControl as FormControlChakra,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AutoComplete } from "./AutoComplete";
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
  const AutoCompleteInput = AutoComplete as (props: any) => any;

  return (
    <FormControlChakra {...rest} data-testid="FormControlTestId" isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {!autoCompleteProps ? (
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
      ) : (
        <AutoCompleteInput
          label={label}
          renderInput={(props: any) => {
            return (
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
            );
          }}
          ref={ref}
          placeholder={autoCompleteProps?.placeholder ?? "Digite para pesquisar"}
          items={autoCompleteProps?.list}
          listStyleProps={{ bgColor: "purple.900", color: "white" }}
          listItemStyleProps={{ bgColor: "purple.900", color: "white" }}
          highlightItemBg="purple.700"
        />
      )}

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControlChakra>
  );
};
export const FormControl = memo(forwardRef(FormControlMolecules));
