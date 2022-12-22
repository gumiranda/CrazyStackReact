import { Select as SelectChakra, SelectProps, Flex, FormLabel } from "@chakra-ui/react";

export const Select = ({
  children,
  list,
  keyValue,
  keyLabel,
  label,
  ...rest
}: SelectProps & { list: any[]; keyValue: string; keyLabel: string; label: string }) => {
  return (
    <Flex alignItems="flex-start" justifyContent={"center"} flexDir="column">
      {!!label && <FormLabel htmlFor={rest?.name ?? rest?.id}>{label}</FormLabel>}
      <SelectChakra bg="purple.700" {...rest} data-testid="SelectTestId">
        {list?.map?.((item, index) => (
          <option
            style={{ backgroundColor: "#7159c1" }}
            key={item?.[keyValue] ?? index}
            value={item?.[keyValue]}
          >
            {item?.[keyLabel]}
          </option>
        ))}
        {children}
      </SelectChakra>
    </Flex>
  );
};
