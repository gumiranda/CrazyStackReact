import React from "react";
import { useController, FieldValues, UseControllerProps } from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react";
import { Select, Props as SelectProps, GroupBase } from "chakra-react-select";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<SelectProps<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
}

export const ControlledSelect = <
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) => {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({ name, control, rules, shouldUnregister });
  return (
    // @ts-ignore
    <FormControl textColor={"purple.900"}>
      {label && (
        <FormLabel textColor="white" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Select<Option, IsMulti, Group>
        {...selectProps}
        {...field}
        options={options}
        id={name}
        isInvalid={!!error}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
