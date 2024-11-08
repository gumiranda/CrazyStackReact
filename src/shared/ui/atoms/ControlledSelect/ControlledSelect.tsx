import React from "react";
import { useController, FieldValues, UseControllerProps } from "react-hook-form";
import { Portal } from "@ark-ui/react/portal";
import { Select, createListCollection } from "@ark-ui/react/select";
import { ChevronDownIcon } from "lucide-react";
import { FormControl } from "../../molecules";
import { FormLabel } from "../FormLabel";
import { Text } from "@/shared/ui/atoms/Text";
interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
> extends Omit<React.ComponentProps<typeof Select.Root>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
}

export const ControlledSelect = <FormValues extends FieldValues = FieldValues>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: ControlledSelectProps<FormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({ name, control, rules, shouldUnregister });

  const collection = createListCollection({
    items: options,
  });

  return (
    <FormControl name={name}>
      {label && (
        <FormLabel textColor="white" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Select.Root
        //collection={collection}
        {...selectProps}
        {...field}
        multiple
      >
        <Select.Label>{label || "Selecione uma opção"}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Selecione uma opção" />
            <Select.Indicator>
              <ChevronDownIcon />
            </Select.Indicator>
          </Select.Trigger>
          <Select.ClearTrigger>Clear</Select.ClearTrigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup>
                <Select.ItemGroupLabel>Opções</Select.ItemGroupLabel>
                {collection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
      {error && <Text>{error.message}</Text>}
    </FormControl>
  );
};
