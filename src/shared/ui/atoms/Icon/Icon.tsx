import { Icon as IconChakra, IconProps } from "@chakra-ui/react";
import React from "react";
export const Icon = ({ as, ...rest }: IconProps & { as: any }) => {
  return (
    <IconChakra {...rest} data-testid="IconTestId">
      {React.createElement(as, { ...rest })}
    </IconChakra>
  );
};
