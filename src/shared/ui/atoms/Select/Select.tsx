import { Flex } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { createListCollection } from "@chakra-ui/react";

export const Select = ({
  children,
  list,
  keyValue,
  keyLabel,
  label,
  labelColor = "white",
  ...rest
}: any) => {
  if (rest?.value === null) {
    rest.value = "";
  }
  const listCollection = createListCollection({
    items: list,
  });
  return (
    <Flex alignItems="flex-start" justifyContent={"center"} flexDir="column">
      {/* {!!label && (
        <FormLabel color={labelColor} htmlFor={rest?.name ?? rest?.id}>
          {label}
        </FormLabel>
      )} */}
      <SelectRoot
        colorPalette="secondary.500"
        {...rest}
        data-testid="SelectTestId"
        collection={listCollection}
        onValueChange={(e) => rest?.onChange?.({ target: { value: e.value } })}
      >
        <SelectLabel />
        <SelectTrigger>
          <SelectValueText placeholder="Select uma opção" />
        </SelectTrigger>
        <SelectContent>
          {listCollection?.items?.map?.((item, index) => (
            <SelectItem
              // style={{ backgroundColor: colors.secondary[500] }}
              key={item?.[keyValue]}
              item={item}
              colorPalette="secondary.500"
              bgColor={"secondary.500"}
            >
              {item?.[keyLabel]}
            </SelectItem>
          ))}
          {children}
        </SelectContent>
      </SelectRoot>
    </Flex>
  );
};
