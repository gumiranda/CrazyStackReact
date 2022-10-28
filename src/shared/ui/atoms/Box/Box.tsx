import { Box as BoxChakra, BoxProps } from "@chakra-ui/react";
export const Box = ({ children, ...rest }: BoxProps) => {
  return (
    <BoxChakra {...rest} data-testid="BoxTestId">
      {children}
    </BoxChakra>
  );
};
