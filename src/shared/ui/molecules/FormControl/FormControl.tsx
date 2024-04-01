"use client";
import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import {
  FormLabel,
  FormControl as FormControlChakra,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { AutoComplete } from "./AutoComplete";
import { Input } from "@/shared/ui";
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
    ...rest
  } = props;
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
          renderInput={(props: any) => {
            return <FormControlInputMask {...props} ref={ref} />;
          }}
          ref={ref}
          placeholder={autoCompleteProps?.placeholder ?? "Digite para pesquisar"}
          _placeholder={{ opacity: 1, color: "gray.500" }}
          items={autoCompleteProps?.list}
          listStyleProps={{ bgColor: "primary.600", color: "white" }}
          listItemStyleProps={{ bgColor: "primary.600", color: "white" }}
          highlightItemBg="primary.500"
        />
      )}

      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControlChakra>
  );
};
const FormControlInputMask_ = (props, ref) => {
  const {
    bgColor = "primary.600",
    bgColorHover = "primary.600",
    labelColor = "white",
    type = "text",
    mask,
  } = props;
  /* if (type === `tel`) {
    return (
      <InputGroup alignItems={`center`}>
        <InputLeftAddon
          alignItems={`center`}
          color={labelColor}
          h={`46px`}
          bgColor={bgColor}
          _hover={{ bgColor: bgColorHover }}
        >
          +55
        </InputLeftAddon>
        <DefaultInput {...props} ref={ref} as={InputMask} />
      </InputGroup>
    );
  } */
  if (mask) {
    return <DefaultInput {...props} ref={ref} as={InputMask} />;
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
      ref={ref}
      size={size}
      type={type}
      _placeholder={{ opacity: 1, color: "gray.500" }}
      color={labelColor}
    />
  );
};
export const DefaultInput = memo(forwardRef(DefaultInput_));
export const FormControlInputMask = memo(forwardRef(FormControlInputMask_));
export const FormControl = memo(forwardRef(FormControlMolecules));
