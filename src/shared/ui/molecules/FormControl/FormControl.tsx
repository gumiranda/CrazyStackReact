"use client";
import React, { memo } from "react";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { Input, Checkbox } from "@/shared/ui";
import { InputMask } from "@react-input/mask";
import { Field } from "@/components/ui/field";
import { AutoComplete } from "./NewAutocomplete";
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
const FormControlMolecules = (props) => {
  const {
    name,
    size = "lg",
    variant = "filled",
    bgColor = "secondary.500",
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

  return (
    <Field
      {...rest}
      label={label}
      data-testid="FormControlTestId"
      invalid={!!error}
      recipe={undefined}
      errorText={error?.message}
      color={labelColor}
    >
      <>
        {!autoCompleteProps ? (
          <FormControlInputMask {...props} labelColor={labelColor} />
        ) : (
          <AutoComplete {...props} />
        )}
      </>
    </Field>
  );
};
const FormControlInputMask_ = (props) => {
  const { mask, hide, checkboxprops, ref, labelColor, ...other } = props;
  if (hide) {
    return null;
  }
  if (mask) {
    return (
      <InputMask
        //{...other}
        color={labelColor}
        name={other?.name}
        type={other?.type}
        showMask
        onMask={other?.onChange}
        ref={ref}
        style={{ color: labelColor }}
        component={DefaultInput}
        mask={mask}
        replacement={{ _: /\d/, A: /[a-zA-Z0-9]/, X: /[a-zA-Z]/ }}
      />
    );
    // return <DefaultInput {...other} ref={ref} />;
  }
  if (checkboxprops) {
    return (
      <Checkbox
        // {...other}
        {...checkboxprops}
        ref={ref}
      />
    );
  }
  return <DefaultInput {...other} ref={ref} />;
};
const DefaultInput_ = (props) => {
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
      focusbordercolor={focusBorderColor}
      bgColor={bgColor}
      variant={variant}
      _hover={{ bgColor: bgColorHover }}
      size={size}
      type={type}
      _placeholder={{ opacity: 1, color: "gray.500" }}
      ref={props?.ref}
    />
  );
};
export const DefaultInput = memo(DefaultInput_);
export const FormControlInputMask = memo(FormControlInputMask_);
export const FormControl = memo(FormControlMolecules);
