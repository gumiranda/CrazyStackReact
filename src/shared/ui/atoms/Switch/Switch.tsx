import { Switch as SwitchChakra, SwitchProps } from "@chakra-ui/react";
export const Switch = ({ children, ...rest }: SwitchProps) => {
  return (
    <SwitchChakra {...rest} data-testid="SwitchTestId">
      {children}
    </SwitchChakra>
  );
};
