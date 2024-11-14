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
  defaultValue,
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
    <Flex
      alignItems="flex-start"
      justifyContent={"center"}
      flexDir="column"
      bgColor={"transparent"}
      minW="100%"
    >
      <SelectRoot
        {...rest}
        data-testid="SelectTestId"
        collection={listCollection}
        //defaultValue={defaultValue ?? ""}
        value={rest?.multiple ? rest?.value : [rest?.value]}
        onValueChange={(e) => {
          rest?.onChange?.({
            target: { value: rest?.multiple ? e?.value : (e?.value?.[0] ?? e?.value) },
          });
        }}
      >
        <SelectLabel bgColor={"transparent"}>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Selecione uma opção" color={labelColor} />
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
