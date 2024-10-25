import { Switch as SwitchChakra } from "@/components/ui/switch";

export const Switch = ({ children, ...rest }) => {
  return (
    <SwitchChakra {...rest} data-testid="SwitchTestId">
      {children}
    </SwitchChakra>
  );
};
