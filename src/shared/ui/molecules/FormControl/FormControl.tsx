import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import {
  FormLabel,
  FormControl as FormControlChakra,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Input } from "shared/ui";
interface InputProps extends ChakraInputProps {
  name: string;
  bgColorHover?: string;
  label?: string;
  error?: any;
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
    ...rest
  },
  ref
) => {
  return (
    <FormControlChakra {...rest} data-testid="FormControlTestId" isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
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
      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControlChakra>
  );
};
export const FormControl = memo(forwardRef(FormControlMolecules));
