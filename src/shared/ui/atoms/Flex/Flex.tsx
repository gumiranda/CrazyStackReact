import { Flex as FlexChakra, FlexProps } from "@chakra-ui/react";
export const Flex = ({ children, ...rest }: FlexProps) => {
  return (
    <FlexChakra {...rest} data-testid="FlexTestId">
      {children}
    </FlexChakra>
  );
};
