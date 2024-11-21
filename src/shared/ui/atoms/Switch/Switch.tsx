import { Switch as SwitchChakra } from "@/components/ui/switch";

export const Switch = ({ children = null, ...rest }) => {
  return (
    <SwitchChakra {...rest} data-testid="SwitchTestId">
      {children}
    </SwitchChakra>
  );
};
