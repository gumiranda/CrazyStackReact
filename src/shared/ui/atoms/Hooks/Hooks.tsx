import { Hooks as HooksChakra, HooksProps } from "@chakra-ui/react";
export const Hooks = ({ children, ...rest }: HooksProps) => {
  return (
    <HooksChakra {...rest} data-testid="HooksTestId">
      {children}
    </HooksChakra>
  );
};
