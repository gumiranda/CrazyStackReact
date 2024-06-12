import { theme } from "@/application/theme";
import { Select as SelectChakra, SelectProps, Flex, FormLabel } from "@chakra-ui/react";

export const Select = ({
  children,
  list,
  keyValue,
  keyLabel,
  label,
  labelColor = "white",
  ...rest
}: SelectProps & {
  list: any[];
  keyValue: string;
  keyLabel: string;
  label: string;
  labelColor?: string;
}) => {
  return (
    <Flex alignItems="flex-start" justifyContent={"center"} flexDir="column">
      {!!label && (
        <FormLabel color={labelColor} htmlFor={rest?.name ?? rest?.id}>
          {label}
        </FormLabel>
      )}
      <SelectChakra bg="secondary.500" {...rest} data-testid="SelectTestId">
        {list?.map?.((item, index) => (
          <option
            style={{ backgroundColor: theme.colors.secondary[500] }}
            key={`${item?.[keyValue]}${item?.[keyLabel]}` ?? index}
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
