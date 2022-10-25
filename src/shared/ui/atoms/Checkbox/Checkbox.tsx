import { Checkbox as CheckboxChakra, CheckboxProps } from "@chakra-ui/react";
export const Checkbox = ({ children, ...rest }: CheckboxProps) => {
  return (
    <CheckboxChakra {...rest} data-testid="CheckboxTestId">
      {children}
    </CheckboxChakra>
  );
};
