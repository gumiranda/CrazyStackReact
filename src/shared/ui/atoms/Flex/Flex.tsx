"use client";

import { Flex as FlexChakra, FlexProps } from "@chakra-ui/react";
import { forwardRef } from "react";
export const Flex_ = ({ children, ...rest }: FlexProps, ref: any) => {
  return (
    <FlexChakra {...rest} ref={ref} data-testid="FlexTestId">
      {children}
    </FlexChakra>
  );
};
export const Flex = forwardRef(Flex_);
