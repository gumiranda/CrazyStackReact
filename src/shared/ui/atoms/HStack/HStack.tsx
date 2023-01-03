import { HStack as HStackChakra, HStackProps } from "@chakra-ui/react";
export const HStack = ({ children, ...rest }: HStackProps) => {
  return (
    <HStackChakra {...rest} data-testid="HStackTestId">
      {children}
    </HStackChakra>
  );
};
