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
    items: list
      ?.map?.((item) => ({ label: item?.[keyLabel], value: item?.[keyValue] }))
      ?.concat?.([{ label: "Carregar mais", value: "loadMore" }]),
  });
  return (
    <Flex alignItems="flex-start" justifyContent={"center"} flexDir="column">
      <SelectRoot
        colorPalette="secondary.500"
        {...rest}
        data-testid="SelectTestId"
        collection={listCollection}
        value={[rest?.value]}
        onValueChange={(e) => {
          rest?.onChange?.({ target: { value: e?.value?.[0] ?? e?.value } });
        }}
      >
        <SelectLabel />
        <SelectTrigger>
          <SelectValueText placeholder="Select uma opção" />
        </SelectTrigger>
        <SelectContent>
          {listCollection?.items?.map?.((item: any, index) => {
            return (
              <SelectItem
                key={item?.value}
                item={item}
                colorPalette="secondary.500"
                bgColor={"secondary.500"}
              >
                {item?.label}
              </SelectItem>
            );
          })}

          {children}
        </SelectContent>
      </SelectRoot>
    </Flex>
  );
};
