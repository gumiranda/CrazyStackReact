import { Stack as StackChakra, StackProps } from "@chakra-ui/react";
export const Stack = ({ children, ...rest }: StackProps) => {
  return (
    <StackChakra {...rest} data-testid="StackTestId">
      {children}
    </StackChakra>
  );
};
