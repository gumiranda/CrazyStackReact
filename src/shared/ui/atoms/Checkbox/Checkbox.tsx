import {
  Flex,
  FormLabel,
  Checkbox as CheckboxChakra,
  CheckboxProps,
} from "@chakra-ui/react";
export const Checkbox = ({
  children,
  label,
  ...rest
}: CheckboxProps & { label?: string }) => {
  return (
    <Flex justify="flex-start" flexDir="row" alignItems={"center"}>
      <CheckboxChakra {...rest} data-testid="CheckboxTestId">
        {children}
      </CheckboxChakra>
      &nbsp;&nbsp;
      {!!label && (
        <FormLabel mb={0} htmlFor={rest?.name ?? rest?.id}>
          {label}
        </FormLabel>
      )}
    </Flex>
  );
};
