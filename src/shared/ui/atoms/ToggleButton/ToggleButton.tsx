import { ToggleButton as ToggleButtonChakra, ToggleButtonProps } from "@chakra-ui/react";
export const ToggleButton = ({ children, ...rest }: ToggleButtonProps) => {
  return (
    <ToggleButtonChakra {...rest} data-testid="ToggleButtonTestId">
      {children}
    </ToggleButtonChakra>
  );
};
