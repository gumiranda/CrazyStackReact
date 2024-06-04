import { Icon as IconChakra, IconProps } from "@chakra-ui/react";
export const Icon = ({ children, ...rest }: IconProps) => {
  return (
    <IconChakra {...rest} data-testid="IconTestId">
      {children}
    </IconChakra>
  );
};
