import { Checkbox as Checkbox2 } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Flex } from "@chakra-ui/react";

export const Checkbox = ({ children = null, label, ...rest }) => {
  return (
    <Flex justify="flex-start" flexDir="row" alignItems={"center"}>
      &nbsp;&nbsp;
      {label ? (
        <Field mb={0} label={label}>
          <Checkbox2 {...rest} data-testid="CheckboxTestId">
            {children}
          </Checkbox2>
        </Field>
      ) : (
        <Checkbox2 {...rest} data-testid="CheckboxTestId">
          {children}
        </Checkbox2>
      )}
    </Flex>
  );
};
