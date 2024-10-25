import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Flex } from "@chakra-ui/react";

export const Checkbox_ = ({ children, label, ...rest }, ref) => {
  return (
    <Flex justify="flex-start" flexDir="row" alignItems={"center"}>
      &nbsp;&nbsp;
      {label ? (
        <Field mb={0} label={label}>
          <Checkbox ref={ref} {...rest} data-testid="CheckboxTestId">
            {children}
          </Checkbox>
        </Field>
      ) : (
        <Checkbox ref={ref} {...rest} data-testid="CheckboxTestId">
          {children}
        </Checkbox>
      )}
    </Flex>
  );
};
