import { HStack as HStackChakra, StackProps } from "@chakra-ui/react";
export const HStack = ({ children, ...rest }: StackProps) => {
  return (
    <HStackChakra {...rest} data-testid="HStackTestId">
      {children}
    </HStackChakra>
  );
};
