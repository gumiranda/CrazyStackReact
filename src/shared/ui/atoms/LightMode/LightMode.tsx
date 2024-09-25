import { LightMode as LightModeChakra } from "@chakra-ui/react";
export const LightMode = ({ children, ...rest }: any) => {
  return (
    <LightModeChakra {...rest} data-testid="LightModeTestId">
      {children}
    </LightModeChakra>
  );
};
