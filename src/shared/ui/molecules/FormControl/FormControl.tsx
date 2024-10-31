"use client";
import React, { memo } from "react";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { AutoComplete } from "./AutoComplete";
import { Input, Checkbox, Text } from "@/shared/ui";
import { InputMask } from "@react-input/mask";
import { Field } from "@/components/ui/field";
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
  const Componente = () => {
    return (
      <>
        {!autoCompleteProps ? (
          <FormControlInputMask {...props} />
        ) : (
          <AutoCompleteInput
            label={label}
            renderInput={(currentProps: any) => {
              return <DefaultInput {...props} {...currentProps} />;
            }}
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

        {!!error && <Text>{error?.message}</Text>}
      </>
    );
  };
  return (
    <Field
      {...rest}
      label={label}
      data-testid="FormControlTestId"
      invalid={!!error}
      recipe={undefined}
    >
      <Componente />
    </Field>
  );
};
const FormControlInputMask_ = (props) => {
  const { mask, hide, checkboxprops, ref, ...other } = props;
  if (hide) {
    return null;
  }
  if (mask) {
    return (
      <InputMask
        //{...other}
        name={other?.name}
        type={other?.type}
        showMask
        onMask={other?.onChange}
        ref={ref}
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
      color={labelColor}
      ref={props?.ref}
    />
  );
};
export const DefaultInput = memo(DefaultInput_);
export const FormControlInputMask = memo(FormControlInputMask_);
export const FormControl = memo(FormControlMolecules);
