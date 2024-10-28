"use client";

import { Flex as FlexChakra, FlexProps } from "@chakra-ui/react";
export const Flex = ({ children, ...rest }: FlexProps, ref) => {
  return (
    <FlexChakra {...rest} ref={ref} data-testid="FlexTestId">
      {children}
    </FlexChakra>
  );
};
