import {
  Flex,
  FormLabel,
  Checkbox as CheckboxChakra,
  CheckboxProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";
export const Checkbox_ = (
  { children, label, ...rest }: CheckboxProps & { label?: string },
  ref
) => {
  return (
    <Flex justify="flex-start" flexDir="row" alignItems={"center"}>
      <CheckboxChakra ref={ref} {...rest} data-testid="CheckboxTestId">
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
export const Checkbox = forwardRef(Checkbox_);
