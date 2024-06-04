import { LightMode as LightModeChakra, LightModeProps } from "@chakra-ui/react";
export const LightMode = ({ children, ...rest }: LightModeProps) => {
  return (
    <LightModeChakra {...rest} data-testid="LightModeTestId">
      {children}
    </LightModeChakra>
  );
};
