import { Flex } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
export const Selects = ({
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
  return (
    <Flex alignItems="flex-start" justifyContent={"center"} flexDir="column">
      {/* {!!label && (
        <FormLabel color={labelColor} htmlFor={rest?.name ?? rest?.id}>
          {label}
        </FormLabel>
      )} */}
      <SelectRoot bg="secondary.500" {...rest} data-testid="SelectTestId">
        <SelectLabel />
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {list?.map?.((item, index) => (
            <SelectItem
              // style={{ backgroundColor: colors.secondary[500] }}
              key={item?.[keyValue]}
              item={item}
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
