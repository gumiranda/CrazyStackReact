"use client";
import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import {
  FormLabel,
  FormControl as FormControlChakra,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AutoComplete } from "./AutoComplete";
import { Input, Checkbox } from "@/shared/ui";
import InputMask from "react-input-mask";

interface InputProps extends ChakraInputProps {
  name: string;
  bgColorHover?: string;
  label?: string;
  error?: any;
  autoCompleteProps?: any;
  labelColor?: string;
  inputBgColor?: string;
  mask?: string;
  maskChar?: string | null;
  hide?: any;
}
const FormControlMolecules: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const {
    name,
    size = "lg",
    focusBorderColor = "tertiary.500",
    variant = "filled",
    bgColor = "#7159C1",
    bgColorHover = "primary.600",
    label,
    error = null,
    autoCompleteProps = null,
    labelColor = "white",
    inputBgColor = "primary.500",
    type = "text",
    hide,
    ...rest
  } = props;
  if (hide) {
    return null;
  }
  const AutoCompleteInput = AutoComplete as (props: any) => any;

  return (
    <FormControlChakra {...rest} data-testid="FormControlTestId" isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={labelColor}>
          {label}
        </FormLabel>
      )}

      {!autoCompleteProps ? (
        <FormControlInputMask {...props} ref={ref} />
      ) : (
        <AutoCompleteInput
          label={label}
          renderInput={(currentProps: any) => {
            return <DefaultInput ref={ref} {...props} {...currentProps} />;
          }}
          ref={ref}
          placeholder={autoCompleteProps?.placeholder ?? "Digite para pesquisar"}
          _placeholder={{ opacity: 1, color: "gray.500" }}
          items={autoCompleteProps?.list}
          listStyleProps={
            autoCompleteProps?.listStyleProps ?? {
              bgColor: "primary.600",
              color: "white",
            }
          }
          listItemStyleProps={
            autoCompleteProps?.listItemStyleProps ?? {
              bgColor: "primary.600",
              color: "white",
            }
          }
          highlightItemBg={autoCompleteProps?.highlightItemBg ?? "primary.500"}
        />
      )}

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControlChakra>
  );
};
const FormControlInputMask_ = (props, ref) => {
  const { mask, hide, checkboxProps } = props;
  if (hide) {
    return null;
  }
  if (mask) {
    return <DefaultInput {...props} ref={ref} as={InputMask} />;
  }
  if (checkboxProps) {
    return <Checkbox {...props} {...checkboxProps} ref={ref} />;
  }
  return <DefaultInput {...props} ref={ref} />;
};
const DefaultInput_ = (props, ref) => {
  const {
    name,
    size = "lg",
    focusBorderColor = "tertiary.500",
    variant = "outline",
    bgColor = "transparent",
    bgColorHover = "transparent",
    label,
    error = null,
    autoCompleteProps = null,
    labelColor = "white",
    inputBgColor = "transparent",
    type = "text",
    ...rest
  } = props;
  return (
    <Input
      {...rest}
      id={name}
      name={name}
      focusBorderColor={focusBorderColor}
      bgColor={bgColor}
      variant={variant}
      _hover={{ bgColor: bgColorHover }}
      size={size}
      type={type}
      _placeholder={{ opacity: 1, color: "gray.500" }}
      color={labelColor}
      ref={ref}
    />
  );
};
export const DefaultInput = memo(forwardRef(DefaultInput_));
export const FormControlInputMask = memo(forwardRef(FormControlInputMask_));
export const FormControl = memo(forwardRef(FormControlMolecules));
